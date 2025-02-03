export interface FormErrors {
    [key: string]: string | undefined;
  }
  
  export enum AddRegisterRoutes {
    PERSONAL_INFO = '/register/step-one',
    DONATE_INFO = '/register/step-two',
    PAYMENT_INFO = '/register/step-three',
  }

  export interface FormValues {
    id: number;
    status: number;
    name: string;
    email: string;
    telephone: string;
    address: string;
    donate: number;
    donateAmount: number;
    singlePinAmount: number;
    pinSetAmount: number;
    receipt: number;
    nationalId: string;
    receiptName: string;
    receiptAddress: string;
    buyShirt: number;
    order: string;
    transferTime: string;
    transferDate: string;
    trackingNumber1?: string;
    trackingNumber2?: string;
    problems?: string;
    created_at: Date;
    updated_at: Date;
    allPinAmount: number;
  }