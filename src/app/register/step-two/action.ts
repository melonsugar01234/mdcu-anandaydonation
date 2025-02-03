"use server";

import { stepTwoSchema } from "../schema";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddRegisterRoutes, FormErrors } from "@/lib/types";

export async function stepTwoFormAction(
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> {
    const data = Object.fromEntries(formData.entries());
    const validated = stepTwoSchema.safeParse(data);
    console.log(validated.success);
    if (!validated.success) {
      const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
        const path = issue.path[0] as string;
        acc[path] = issue.message;
        return acc;
      }, {});
      return errors;
    }
  
    const parsedData = validated.data;
  
    try {
      await prisma.registrations.create({
        data: {
        donateAmount: parsedData.donateAmount,
        singlePinAmount: parsedData.singlePinAmount,
        buyShirt: parsedData.buyShirt ? 1 : 0,
        order: parsedData.order,
      },
    });
    redirect(AddRegisterRoutes.PAYMENT_INFO);
  } catch (error) {
    console.error("Database error:", error);
    return { general: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
  }
}
