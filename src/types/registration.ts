import {
  FORM_TEXT_MAX_SIZE,
  MAX_ORDERS_PER_ITEM,
  MAX_ORDERS_PER_REGISTRATION,
  TRANSFER_RECEIPT_MAX_COUNT,
  TRANSFER_RECEIPT_MAX_SIZE,
} from "@/config";
import { z } from "zod";

/**
 * Valid payment methods
 */
export const PaymentMethods = {
  QRCode: 1,
  BankAccountNumber: 2,
} as const;
export const PaymentMethodsZ = z.nativeEnum(PaymentMethods);
export type PaymentMethodsT = z.infer<typeof PaymentMethodsZ>;

/**
 * Base Registration Data containing fields that is always present
 */
export type RegistrationData = {
  name: string | null;
  tel: string | null;
  email: string | null;
  address: string | null;
  paymentMethod: PaymentMethodsT | null;
  requestReceipt: boolean | null;
  donateAmount: number | null;
  nationalId: string | null;
  nameOnReceipt: string | null;
  addressOnReceipt: string | null;
  transferDateTime: Date | number | null;
  statusNotes: string | null;
  internalNotes: string | null;
};

/**
 * For use when user submits the form
 */
export const RegistrationFormDataZ = z.object({
  name: z.string().max(FORM_TEXT_MAX_SIZE),
  tel: z.string().max(FORM_TEXT_MAX_SIZE),
  email: z.null().or(z.string().max(FORM_TEXT_MAX_SIZE)),
  address: z.string().max(FORM_TEXT_MAX_SIZE),
  paymentMethod: PaymentMethodsZ,
  requestReceipt: z.boolean(),
  donateAmount: z.number().nonnegative().int().lte(Number.MAX_SAFE_INTEGER),
  nationalId: z.nullable(z.string().max(FORM_TEXT_MAX_SIZE)),
  nameOnReceipt: z.nullable(z.string().max(FORM_TEXT_MAX_SIZE)),
  addressOnReceipt: z.nullable(z.string().max(FORM_TEXT_MAX_SIZE)),
  transferDateTime: z.number().positive().finite(),
  orders: z
    .array(
      z.object({
        id: z.number(),
        amount: z.number().positive().int().lte(MAX_ORDERS_PER_ITEM),
      }),
    )
    .max(MAX_ORDERS_PER_REGISTRATION),
  receipts: z
    .array(z.string().max(TRANSFER_RECEIPT_MAX_SIZE * 1.65))
    .max(TRANSFER_RECEIPT_MAX_COUNT),
});
export type RegistrationFormData = z.infer<typeof RegistrationFormDataZ>;

/**
 * For use when registration is updated.
 *
 * Note: Doesn't perform as much validation as RegistrationFormData
 * because only admin will use the update functionality
 */
export type RegistrationUpdateData = Partial<RegistrationData> & {
  status?: number;
  trackingCode?: string;
  isIncludedInTotal?: boolean;
  orders?: Orders[];
  receipts?: string[];
};

/**
 * For use when the API returns registration data
 */
export type RegistrationApiResult = RegistrationData & {
  created: Date | number;
  updated: Date | number;
  trackingCode: string;
  isIncludedInTotal: boolean;
  statusNameEN?: string | null;
  statusNameTH?: string | null;
  orders?: Orders[];
};

/**
 * Map itemId to amount
 */
export type Orders = {
  id: number;
  amount: number;
  nameEN?: string | null;
  nameTH?: string | null;
};
