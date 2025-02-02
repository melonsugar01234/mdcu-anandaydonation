import z from 'zod';

export const stepOneSchema = z.object({
   name: z.string().trim().min(1, {
        message: "กรุณากรอกชื่อ",
      }),
        telephone: z.string().trim().min(10, {
            message: "กรุณากรอกเบอร์โทรศัพท์",
        }),
      email: z.string().trim().email({
        message: "กรุณากรอกอีเมลที่ถูกต้อง",
      }),
        address: z.string().trim().min(1, {
            message: "กรุณากรอกที่อยู่",
        }),
      donate: z.union([z.literal(0), z.literal(1)])
  });

  export const stepTwoSchema = z.object({
    donateAmount: z.number().min(1, {
      message: "กรุณากรอกจำนวนเงินบริจาค",
    }),
    singlePinAmount: z.number().min(1, {
      message: "กรุณากรอกจำนวนเข็มที่ระลึก",
    }),
    buyShirt: z.boolean(),
    order: z.string().trim().min(1, {
      message: "กรุณากรอกรายการสั่งซื้อ",
    }),
  });