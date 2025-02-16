import type { FC } from "react";
import { useLocale, useTranslations } from "next-intl";
import { type Locales } from "@/i18n/routing";
import { LocaleSwitchClient } from "./LocaleSwitchClient";

export const LocaleSwitch: FC<{ className?: string | undefined }> = ({ className }) => {
  const t = useTranslations("LocaleSwitch");
  const locale = useLocale();
  let switchToLocale: Locales = "th";

  if (locale === "en") {
    switchToLocale = "th";
  } else if (locale === "th") {
    switchToLocale = "en";
  } else {
    return <p>LocaleSwitch only support TH/EN</p>;
  }

  return (
    <LocaleSwitchClient className={className} label={t("switch")} switchToLocale={switchToLocale} />
  );
};
