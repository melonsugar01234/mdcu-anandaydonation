"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage()
  return (
    
    <>
      <footer className={`footer bg-primary text-neutral-content items-center p-4 ${
              language === "th" ? "" : "hidden"
            }`}>
        คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย โทร. 02 256 4183 หรือ 02 256 4462
        <Link
          className="link link-accent"
          href="https://www.facebook.com/anandamahidol.day/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook
        </Link>
      </footer>
      <footer className={`footer bg-primary text-neutral-content items-center p-4 ${
              language === "en" ? "" : "hidden"
            }`}>
        Faculty of Medicine, Chulalongkorn University, Tel. 02 256 4183 or 02 256 4462
        <Link
          className="link link-accent justify-end"
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
