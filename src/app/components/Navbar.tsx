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

        <div className="navbar-end flex items-center gap-5 px-4">    
          <button
            className={`flex items-center gap-2 ${language === "th" ? "btn-disabled" : ""}`}
            onClick={() => toggleLanguage("th")}
            disabled={language === "th"} 
          >
            <img src="/images/TH_icon.png" alt="TH" className="h-5 w-5" />
            ไทย /
          </button>
          <button
            className={`flex items-center gap-2 ${language === "en" ? "btn-disabled" : ""}`}
            onClick={() => toggleLanguage("en")}
            disabled={language === "en"} 
          >
            <img src="/images/EN_icon.png" alt="EN" className="h-5 w-5" />
            EN
          </button>
        </div>
      </div>
    </>
  );
}
