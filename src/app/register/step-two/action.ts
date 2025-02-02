"use server";

import { stepTwoSchema } from "@/lib/schema";
import { AddDealRoutes, FormErrors } from "@/lib/types";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function stepTwoFormAction(prevState: any, formData: FormData) {
  const result = stepTwoSchema.safeParse({
    donateAmount: parseFloat(formData.get("donateAmount") as string),
    singlePinAmount: parseInt(formData.get("singlePinAmount") as string, 10),
    buyShirt: formData.get("buyShirt") === "true",
    order: formData.get("order") as string,
  });

  if (result.success) {
    await prisma.registrations.create({
        data: {
            donateAmount: result.data.donateAmount,
            singlePinAmount: result.data.singlePinAmount,
            buyShirt: result.data.buyShirt,
            order: result.data.order,
        },
    });
    redirect(AddDealRoutes.PAYMENT_INFO);
  }

  if (result.error) {
    return { error: result.error.flatten().fieldErrors };
  }
}
