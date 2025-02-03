"use server";

import { stepOneSchema } from "../schema";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddRegisterRoutes, FormErrors } from "@/lib/types";

export async function stepOneFormAction(
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> {
    const data = Object.fromEntries(formData.entries());
    const validated = stepOneSchema.safeParse(data);
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
          name: parsedData.name,
          telephone: parsedData.telephone,
          email: parsedData.email,
          address: parsedData.address,
          donate: parseInt(formData.get("donate") as string, 10),
          status: 1,
        },
      });
  
      redirect(AddRegisterRoutes.DONATE_INFO);
    } catch (error) {
      console.error("Database error:", error);
      return { general: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
    }
  }

















// (
//   prevState: FormErrors | undefined,
//   formData: FormData
// ): Promise<FormErrors | undefined> {
//   const parse = stepOneSchema.safeParse({
//     name: formData.get("name") as string,
//     telephone: formData.get("telephone") as string,
//     email: formData.get("email") as string,
//     address: formData.get("address") as string,
//   });

//   if (!parse.success) {
//     const errors: FormErrors = {};
//     parse.error.issues.forEach((issue) => {
//       const path = issue.path[0] as keyof FormErrors;
//       errors[path] = issue.message;
//     });
//     return errors;
//   }

//   const data = parse.data;

//   try {
//     await prisma.registrations.create({
//       data: {
//         name: data.name,
//         telephone: data.telephone,
//         email: data.email,
//         address: data.address,
//         donate: parseInt(formData.get("donate") as string, 10),
//         status: 1, 
//       },
//     });

    
//     redirect(AddRegisterRoutes.DONATE_INFO);
//   } catch (error) {
//     console.error("Database error:", error);
//     return { general: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
//   }
// }
