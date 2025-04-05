"use client";


import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; // Adjust the path as necessary

type LanguageCode = "th" | "en"; // Add more language codes as needed

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      <div className="navbar bg-yellow2025 text-white shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content"
            >
              <li>
                <Link href="/">
                  <span className={language === "th" ? "" : "hidden"}>
                    หน้าหลัก
                  </span>
                  <span className={language === "en" ? "" : "hidden"}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <span className={language === "th" ? "" : "hidden"}>
                    ลงทะเบียนบริจาคและรับของที่ระลึก
                  </span>
                  <span className={language === "en" ? "" : "hidden"}>
                    Register & Donation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/track">
                  <span className={language === "th" ? "" : "hidden"}>
                    ติดตามสถานะ
                  </span>
                  <span className={language === "en" ? "" : "hidden"}>
                    View Status
                  </span>
                </Link>
              </li>
              <li>
              <button onClick={toggleLanguage} className="flex items-center space-x-2">
                    <img
                      src={language === "th" ? "/images/EN_icon.png" : "/images/TH_icon.png"}
                      alt={language === "th" ? "English Icon" : "Thai Icon"}
                      className="w-5 h-5"
                    />
                  <span>{language === "th" ? "English" : "ภาษาไทย"}</span>
              </button>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <span className={language === "th" ? "" : "hidden"}>
              ลงทะเบียนผู้บริจาค ฯ
            </span>
            <span className={language === "en" ? "" : "hidden"}>
              Donor Registration
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">
                <span className={language === "th" ? "" : "hidden"}>
                  หน้าหลัก
                </span>
                <span className={language === "en" ? "" : "hidden"}>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <span className={language === "th" ? "" : "hidden"}>
                  ลงทะเบียนบริจาคและรับของที่ระลึก
                </span>
                <span className={language === "en" ? "" : "hidden"}>
                  Register & Donation
                </span>
              </Link>
            </li>
            <li>
              <Link href="/track">
                <span className={language === "th" ? "" : "hidden"}>
                  ติดตามสถานะ
                </span>
                <span className={language === "en" ? "" : "hidden"}>
                  View Status
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex">
        <button onClick={toggleLanguage} className="btn flex items-center">
                    <img
                      src={language === "th" ? "/images/EN_icon.png" : "/images/TH_icon.png"}
                      alt={language === "th" ? "English Icon" : "Thai Icon"}
                      className="w-5 h-5"
                    />
                  <span>{language === "th" ? "English" : "ภาษาไทย"}</span>
              </button>
        </div>
      </div>
    </>
  );
}
