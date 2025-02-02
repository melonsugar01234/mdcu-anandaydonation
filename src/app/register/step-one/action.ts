"use server";

import { stepOneSchema } from "@/lib/schema";
import { AddDealRoutes, FormErrors } from "@/lib/types";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function stepOneFormAction(prevState: any, formData: FormData) {
  const result = stepOneSchema.safeParse({
    name: formData.get("name"),
    telephone: formData.get("telephone"),
    email: formData.get("email"),
    address: formData.get("address"),
    donate: formData.get("donate")
  });

  if (result.success) {
    await prisma.registrations.create({
        data: {
            name: result.data.name,
            telephone: result.data.telephone,
            email: result.data.email || "",
            address: result.data.address,
            donate: result.data.donate,
            status: 1
        },
    });
    redirect(AddDealRoutes.DONATE_INFO);
  }

  if (result.error) {
    return { error: result.error.flatten().fieldErrors };
  }
}
