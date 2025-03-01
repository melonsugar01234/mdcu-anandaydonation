"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { language, translations, toggleLanguage } = useLanguage();

  return (
    <>
      <div className="navbar bg-primary text-white shadow-lg">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            {translations[language].title}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">{translations[language].home}</Link>
            </li>
            <li>
              <Link href="/register">{translations[language].register}</Link>
            </li>
            <li>
              <Link href="/track">{translations[language].track}</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn" onClick={toggleLanguage}>
            {translations[language].switch}
          </button>
        </div>
      </div>
    </>
  );
}
