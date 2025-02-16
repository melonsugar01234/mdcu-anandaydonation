"use client";

import type { FC } from "react";
import type { Locales } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/routing";

export const LocaleSwitchClient: FC<{
  className?: string | undefined;
  label: string;
  switchToLocale: Locales;
}> = ({ className, label, switchToLocale }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        router.replace(pathname, { locale: switchToLocale });
      }}
    >
      {label}
    </button>
  );
};
