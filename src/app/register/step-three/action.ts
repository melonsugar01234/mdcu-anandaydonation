"use server";

import { stepThreeSchema } from "../schema";
import { prisma } from "@/lib/prisma";
import { AddRegisterRoutes, FormErrors } from "@/lib/types";
import { redirect } from "next/navigation";

export async function getDonateAmount(
  registrationId: string
): Promise<number | null> {
  try {
    const registration = await prisma.registrations.findUnique({
      where: { id: parseInt(registrationId, 10) },
      select: { donate: true },
    });

    return registration?.donate ?? null;
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function stepThreeFormAction(
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> {
  const data = Object.fromEntries(formData.entries());
  const validated = stepThreeSchema.safeParse(data);
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
        transferTime: parsedData.transferTime,
        transferDate: parsedData.transferDate,
        receipt: parseInt(parsedData.receipt, 10),
        nationalId: parsedData.nationalId,
        receiptName: parsedData.receiptName,
        receiptAddress: parsedData.receiptAddress,
      },
    });
    return;
    // redirect(AddRegisterRoutes.);
  } catch (error) {
    console.error("Database error:", error);
    return { general: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
  }
}
