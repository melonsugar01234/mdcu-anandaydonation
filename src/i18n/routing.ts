import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  defaultLocale: "th",
  locales: ["th", "en"],
});

export type Locales = (typeof routing)["locales"][number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
