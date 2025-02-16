import type { Orders, PaymentMethodsT } from "@/types/registration";
import type { doRegister } from "./actions";

export type FormStepsData = [FormStep0Data, FormStep1Data, FormStep2Data];

export type FormStepDBDataProps = {
  items: {
    id: number;
    isAvailable: boolean;
    price: number;
    nameTH: string;
    nameEN: string;
  }[];
  config: Record<
    "enableRegistrations" | "enableSellingPins" | "enableSellingShirts",
    string | null | undefined
  >;
};

export type FormStepProps<StepN extends number> = FormStepDBDataProps & {
  data: FormStepsData;
  setData: (updater: (prev: FormStepsData) => FormStepsData[StepN]) => void;

  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export type FormStep0Data = {
  name: string;
  tel: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethodsT;
  requestReceipt: boolean;
  nationalId: string;
  nameOnReceipt: string;
  addressOnReceipt: string;
};

export type FormStep1Data = {
  donateAmount: number;
  orders: Orders[];
};

export type FormStep2Data = {
  transferDateTime: number;
  receipts: File[];
};

export const FormSubmissionStatesEnum = {
  Initial: 0,
  Pending: 1,
  Failed: 2,
  Success: 3,
} as const;

export type FormSubmissionStates =
  | {
      state: typeof FormSubmissionStatesEnum.Initial;
    }
  | {
      state: typeof FormSubmissionStatesEnum.Pending;
    }
  | {
      state: typeof FormSubmissionStatesEnum.Failed;
      reason?: string;
    }
  | ({
      state: typeof FormSubmissionStatesEnum.Success;
    } & Awaited<ReturnType<typeof doRegister>>);
