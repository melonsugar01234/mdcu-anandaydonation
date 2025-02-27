import type { FormStep0Data, FormStepProps } from "./types";
import { NavButtons } from "./NavButtons";
import { useRef } from "react";
import { Input } from "@/components/Forms";

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
