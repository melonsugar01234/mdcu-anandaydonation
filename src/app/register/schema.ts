import z from "zod";

export const stepOneSchema = z.object({
  name: z.string().min(1, "Please enter a name."),
  telephone: z.string().min(10, "Please enter a valid telephone number."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(1, "Please enter an address."),
  donate: z
    .union([z.literal(0), z.literal(1)])
    .refine((val) => val === 0 || val === 1, "Donate status must be 0 or 1"),
});

export const stepTwoSchema = z.object({
  donateAmount: z.coerce.number().min(1, "Donate amount must be at least 1"),
  singlePinAmount: z.coerce
    .number()
    .min(1, "Single pin amount must be at least 1"),
  pinSetAmount: z.coerce.number().min(1, "Pin set amount must be at least 1"),
  buyShirt: z
    .union([z.literal(0), z.literal(1)])
    .refine((val) => val === 0 || val === 1, "Buy shirt status must be 0 or 1"),
  order: z.string().min(1, "Order must be at least 1 character long"),
});

export const stepThreeSchema = z.object({
  transferTime: z.string().min(1, "Please enter a transfer time."),
  transferDate: z.string().min(1, "Please enter a transfer date."),
  receipt: z.string(),
  nationalId: z.string(),
  receiptName: z.string(),
  receiptAddress: z.string(),
});

export const newRegistrationSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

export const newRegistrationInitialValuesSchema = z.object({
  name: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  donate: z.union([z.literal(0), z.literal(1)]).optional(),
  donateAmount: z.coerce.number().optional(),
  singlePinAmount: z.coerce.number().optional(),
  pinSetAmount: z.coerce.number().optional(),
  buyShirt: z.union([z.literal(0), z.literal(1)]).optional(),
  order: z.string().optional(),
  transferTime: z.string().optional(),
  transferDate: z.string().optional(),
  receipt: z.string(),
  nationalId: z.string(),
  receiptName: z.string(),
  receiptAddress: z.string(),
});

export type NewRegistrationType = z.infer<typeof newRegistrationSchema>;
export type NewRegistrationInitialValuesType = z.infer<
  typeof newRegistrationInitialValuesSchema
>;
