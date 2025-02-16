import { Checkbox, Input, Radio, RadioSet } from "@/components/Forms";
import type { FormStep0Data, FormStepProps } from "./types";
import { NavButtons } from "./NavButtons";
import { useRef } from "react";
import { PaymentMethods, type PaymentMethodsT } from "@/types/registration";
import { FORM_TEXT_MAX_SIZE } from "@/config";
import { useTranslations } from "next-intl";

export const FormStep0UI: React.FC<FormStepProps<0>> = ({ data, setData, setStep }) => {
  const t = useTranslations("RegistrationForm");
  const formRef = useRef<HTMLFormElement | null>(null);

  const updateByKey = <K extends keyof FormStep0Data>(key: K, value: (typeof data)[0][K]) =>
    setData((prev) => {
      const newData = structuredClone(prev[0]);
      newData[key] = value;
      return newData;
    });

  return (
    <>
      <form ref={formRef} className="flex w-full flex-col gap-2">
        <Input
          required
          type="text"
          label={t("nameLabel")}
          autoComplete="section-formstep0 name"
          placeholder={t("nameExample")}
          maxLength={FORM_TEXT_MAX_SIZE}
          validate={t("nameInvalid")}
          value={data[0].name}
          onChange={(v) => updateByKey("name", v)}
        />
        <Input
          required
          type="tel"
          label={t("phoneLabel")}
          autoComplete="section-formstep0 tel"
          placeholder={t("phoneExample")}
          maxLength={FORM_TEXT_MAX_SIZE}
          validate={t("phoneInvalid")}
          pattern="\+?\d+"
          value={data[0].tel}
          onChange={(v) => updateByKey("tel", v.replaceAll(/[^+\d]/g, ""))}
        />
        <Input
          type="email"
          label={t("emailLabel")}
          autoComplete="section-formstep0 email"
          placeholder={t("emailExample")}
          maxLength={FORM_TEXT_MAX_SIZE}
          validate={t("emailInvalid")}
          pattern="^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+\-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$"
          value={data[0].email}
          onChange={(v) => updateByKey("email", v)}
        />
        <Input
          required
          useTextarea
          label={t("addressLabel")}
          autoComplete="section-formstep0 shipping"
          placeholder={t("addressExample")}
          maxLength={FORM_TEXT_MAX_SIZE}
          validate={t("addressInvalid")}
          value={data[0].address}
          onChange={(v) => updateByKey("address", v)}
        />
        <RadioSet
          label={t("paymentMethodLabel")}
          value={data[0].paymentMethod.toString()}
          onChange={(v) => {
            const paymentMethod = Number(v) as PaymentMethodsT;
            updateByKey("paymentMethod", paymentMethod);
            if (paymentMethod !== PaymentMethods.BankAccountNumber)
              updateByKey("requestReceipt", false);
          }}
        >
          <Radio
            className="radio-primary"
            value={PaymentMethods.QRCode.toString()}
            label={t("paymentMethodQRCode")}
          />
          <Radio
            className="radio-primary"
            value={PaymentMethods.BankAccountNumber.toString()}
            label={t("paymentMethodAccNumber")}
          />
        </RadioSet>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend text-base">{t("requestReceiptLabel")}</legend>

          <Checkbox
            label={t("requestReceiptCheckbox")}
            value={data[0].requestReceipt}
            disabled={data[0].paymentMethod !== PaymentMethods.BankAccountNumber}
            onChange={(v) => updateByKey("requestReceipt", v)}
          />

          {data[0].requestReceipt && (
            <>
              <Input
                required
                isInFieldSet
                type="text"
                label={t("natIdLabel")}
                autoComplete="off"
                placeholder={t("natIdExample")}
                maxLength={FORM_TEXT_MAX_SIZE}
                validate={t("natIdInvalid")}
                value={data[0].nationalId}
                onChange={(v) => updateByKey("nationalId", v)}
              />

              <Input
                required
                isInFieldSet
                type="text"
                label={t("nameOnReceiptLabel")}
                autoComplete="section-formstep0 name"
                placeholder={t("nameOnReceiptExample")}
                maxLength={FORM_TEXT_MAX_SIZE}
                validate={t("nameOnReceiptInvalid")}
                value={data[0].nameOnReceipt}
                onChange={(v) => updateByKey("nameOnReceipt", v)}
              />

              <Input
                isInFieldSet
                useTextarea
                label={t("addressOnReceiptLabel")}
                autoComplete="section-formstep0 billing"
                placeholder={t("addressOnReceiptExample")}
                maxLength={FORM_TEXT_MAX_SIZE}
                validate={t("addressOnReceiptInvalid")}
                value={data[0].addressOnReceipt}
                onChange={(v) => updateByKey("addressOnReceipt", v)}
              />
            </>
          )}

          <p className="fieldset-label text-base">{t("requestReceiptNote")}</p>
        </fieldset>
      </form>

      <NavButtons
        isFinalStep={false}
        goNext={() => {
          const formValidity = formRef.current?.reportValidity();
          if (formValidity) {
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
            setStep((step) => step + 1);
          }
        }}
      />
    </>
  );
};
