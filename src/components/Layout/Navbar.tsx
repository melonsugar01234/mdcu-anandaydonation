import type { FC } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";

const MenuSvg: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
};

export default function Navbar() {
  const t = useTranslations("Misc");

  return (
    <nav className="navbar bg-primary text-primary-content shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MenuSvg />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-base-content shadow"
          >
            <li>
              <Link href="/">{t("homepage")}</Link>
            </li>
            <li>
              <Link href="/register">{t("register")}</Link>
            </li>
            <li>
              <Link href="/track">{t("track")}</Link>
            </li>
            <li>
              <LocaleSwitch />
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {t("title")}
        </Link>
      </div>
      <div className="navbar-end hidden shrink-0 flex-nowrap lg:navbar-center md:flex lg:justify-center">
        <ul className="menu menu-horizontal shrink-0 flex-nowrap px-1">
          <li>
            <Link className="btn btn-ghost" href="/">
              {t("homepage")}
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/register">
              {t("register")}
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" href="/track">
              {t("track")}
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden lg:navbar-end lg:flex">
        <LocaleSwitch className="btn btn-sm" />
      </div>
    </nav>
  );
}
