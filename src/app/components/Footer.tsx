import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { language, translations, toggleLanguage } = useLanguage();
  return (
    <>
      <footer className="footer bg-primary text-neutral-content items-center p-4">
        {translations[language].MDCU}
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
