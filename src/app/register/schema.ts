import { z } from "zod";

export const submitFormSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    phone: z.string().nonempty(),
    address: z.string().nonempty(),
    });