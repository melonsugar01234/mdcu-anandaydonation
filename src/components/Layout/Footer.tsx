import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="footer bg-primary p-4 text-primary-content">
      <div className="flex h-full w-full flex-col gap-2 md:flex-row">
        <p>{t("message")}</p>
        <div className="md:ml-auto md:text-right">
          <Link
            className="link"
            href="https://www.facebook.com/anandamahidol.day/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
}
