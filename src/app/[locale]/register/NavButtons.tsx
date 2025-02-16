import { useTranslations } from "next-intl";

export const NavButtons: React.FC<{
  isFinalStep: boolean;
  goNext?: () => void;
  goPrev?: () => void;
}> = ({ isFinalStep, goPrev: goPrevStep, goNext: goNextStep }) => {
  const t = useTranslations("Misc");

  return (
    <div className="mt-4 flex w-full">
      <button type="button" className="btn" disabled={!goPrevStep} onClick={goPrevStep}>
        {t("btnPrev")}
      </button>
      <button
        type="button"
        className="btn btn-primary btn-wide ml-auto"
        disabled={!goNextStep}
        onClick={goNextStep}
      >
        {isFinalStep ? t("btnSubmit") : t("btnNext")}
      </button>
    </div>
  );
};
