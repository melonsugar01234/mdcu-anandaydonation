export interface FormErrors {
    [key: string]: string | undefined;
  }
  
  export enum AddDealRoutes {
    PERSONAL_INFO = '/register/step-one',
    DONATE_INFO = '/register/step-two',
    PAYMENT_INFO = '/register/step-three',
  }