"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  type FormSubmissionStates,
  FormSubmissionStatesEnum,
  type FormStepDBDataProps,
  type FormStepsData,
} from "./types";
import { PaymentMethods } from "@/types/registration";
import { FormStep0UI } from "./FormStep0";
import { FormStep1UI } from "./FormStep1";
import { FormStep2UI } from "./FormStep2";
import { doRegister } from "./actions";
import { blobToBase64 } from "@/utils/utils";
import {
  getStoredRegistrationForm,
  getStoredTrackingCodes,
  setStoredRegistrationForm,
  setStoredTrackingCodes,
} from "@/utils/localStorage";

const FINAL_STEP = 3;

export const RegistrationForm: React.FC<FormStepDBDataProps> = ({ items, config }) => {
  const t = useTranslations("RegistrationForm");
  const tMisc = useTranslations("Misc");

  {
    // region Form Data storage
  }
  const [data, setData] = useState<FormStepsData>(() => {
    const storedFormData = getStoredRegistrationForm();

    if (storedFormData) {
      // Restore form data from localStorage
      return storedFormData;
    } else {
      return [
        // Initial Form data
        {
          name: "",
          tel: "",
          email: "",
          address: "",
          paymentMethod: PaymentMethods.BankAccountNumber,
          requestReceipt: false,
          nationalId: "",
          nameOnReceipt: "",
          addressOnReceipt: "",
        },
        {
          donateAmount: 0,
          orders: [],
          totalPrice: 0,
        },
        {
          transferDateTime: Date.now(),
          receipts: [],
        },
      ];
    }
  });
  {
    // endregion
  }

  {
    // region Track form submission
  }
  const [submission, setSubmission] = useState<FormSubmissionStates>({
    state: FormSubmissionStatesEnum.Initial,
  });

  const submitFormData = async () => {
    const receiptsB64 = await Promise.all(data[2].receipts.map((r) => blobToBase64(r)));
    const formData = { ...data[0], ...data[1], ...data[2], receipts: receiptsB64 };

    doRegister(formData)
      .then((v) => {
        setStoredTrackingCodes([v.trackingCode, ...getStoredTrackingCodes()]);
        setStoredRegistrationForm(null);
        setSubmission({ state: FormSubmissionStatesEnum.Success, ...v });
      })
      .catch((e) =>
        setSubmission({ state: FormSubmissionStatesEnum.Failed, reason: e.toString() }),
      );
  };
  {
    // endregion
  }

  {
    // region Track form step
  }
  /**
   * Keep track of steps
   */
  const [step, setStep] = useState(0);
  const setStepData =
    <N extends number>(step: N) =>
    (updater: (prev: FormStepsData) => FormStepsData[N]) => {
      setData((prev) => {
        const newData = structuredClone(prev);
        newData[step] = updater(prev);

        const newStoredForm = structuredClone(newData);
        newStoredForm[2].receipts = []; // Receipts are too big for localStorage, user will have to reupload this one
        setStoredRegistrationForm(newStoredForm);

        return newData;
      });
    };

  /**
   * When step reaches final step, this code detects if the state is initial and start the form submission process
   */
  useEffect(() => {
    if (step === FINAL_STEP && submission.state === FormSubmissionStatesEnum.Initial) {
      submitFormData();
      setSubmission({ state: FormSubmissionStatesEnum.Pending });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  {
    // endregion
  }

  return (
    <>
      {
        // region Step indicator
      }
      <ul className="steps steps-vertical sm:steps-horizontal mb-4 w-full min-w-max self-start sm:self-center">
        <li className={`step ${step >= 0 ? "step-primary" : ""}`}>{t("stepRegistration")}</li>
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>{t("stepOrdering")}</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>{t("stepPayment")}</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>{t("stepDone")}</li>
      </ul>
      {
        // endregion
      }

      {
        // region Step pages
      }
      {step === 0 && (
        <FormStep0UI
          items={items}
          config={config}
          data={data}
          setData={setStepData(0)}
          setStep={setStep}
        />
      )}
      {step === 1 && (
        <FormStep1UI
          items={items}
          config={config}
          data={data}
          setData={setStepData(1)}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <FormStep2UI
          items={items}
          config={config}
          data={data}
          setData={setStepData(2)}
          setStep={setStep}
        />
      )}
      {
        // endregion
      }

      {
        // region Final step
      }
      {step === FINAL_STEP && (
        <div className="my-8 flex flex-col items-center gap-4">
          {submission.state === FormSubmissionStatesEnum.Initial ||
          submission.state === FormSubmissionStatesEnum.Pending ? (
            <>
              <h2 className="font-bold text-2xl">{t("submittingMsg")}</h2>
              <span className="loading loading-spinner loading-xl"></span>
            </>
          ) : submission.state === FormSubmissionStatesEnum.Failed ? (
            <>
              <h2 className="font-bold text-2xl">{t("submitFailedMsg")}</h2>
              <button
                type="button"
                className="btn btn-wide btn-primary"
                onClick={() =>
                  setSubmission((submission) => {
                    if (submission.state !== FormSubmissionStatesEnum.Failed) return submission;
                    submitFormData();
                    return { state: FormSubmissionStatesEnum.Pending };
                  })
                }
              >
                {tMisc("btnRetry")}
              </button>
            </>
          ) : (
            <>
              <h2 className="font-bold text-2xl">{t("submitSuccessMsg")}</h2>
              <p>
                {t("trackingCodeIsMsg")}
                <span className="text-primary text-xl font-bold">{submission.trackingCode}</span>
              </p>
              <p>{t("submitSuccessNote")}</p>
            </>
          )}
        </div>
      )}
      {
        // endregion
      }
    </>
  );
};
