"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <>
      <footer
        className={`footer bg-primary text-neutral-content p-4 flex justify-between items-center ${
          language === "th" ? "" : "hidden"
        }`}
      >
        <span>
          คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย โทร. 02 256 4183 หรือ 02 256 4462
        </span>
        <Link
          className="link link-accent"
          href="https://www.facebook.com/anandamahidol.day/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </Link>
      </footer>
      <footer
        className={`footer bg-primary text-neutral-content p-4 flex justify-between items-center ${
          language === "en" ? "" : "hidden"
        }`}
      >
        <span>
          Faculty of Medicine, Chulalongkorn University, Tel. 02 256 4183 or 02
          256 4462
        </span>
        <Link
          className="link link-accent"
          href="https://www.facebook.com/anandamahidol.day/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </Link>
      </footer>
    </>
  );
}
