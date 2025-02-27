import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { use } from "react";
import { getRuntimeConfig } from "@/db";
import { formatNumber } from "@/utils/format";

export const dynamic = "force-dynamic";

export default function Home(props: { params: Promise<{ locale: string }> }) {
  const liveDisplayData = use(getRuntimeConfig(["donationsCurrent", "donationsGoal"]));

  const { locale } = use(props.params);
  setRequestLocale(locale);
  const t = useTranslations("Homepage");

  const donationPercent =
    (Number(liveDisplayData.donationsCurrent) / Number(liveDisplayData.donationsGoal)) * 100;

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center gap-4 p-4 py-8">
      <Image src={t("banner_img")} width={1643} height={820} alt="Banner" />
      <div className="divider"></div>
      <h1 className="text-center text-xl font-bold">{t("text1")}</h1>
      <h1 className="text-center text-xl font-bold">{t("text2")}</h1>
      <h2 className="text-center font-bold">{t("text3")}</h2>

      <div className="w-full text-center">
        {/* Example usage for live display data */}
        <progress
          className="progress progress-primary h-4 w-full"
          value={liveDisplayData.donationsCurrent ?? 0}
          max={liveDisplayData.donationsGoal ?? 0}
        ></progress>
        <div
          className="radial-progress text-primary"
          style={
            {
              "--value": donationPercent,
              "--size": "160px",
              "--thickness": "24px",
            } as React.CSSProperties
          }
          aria-valuenow={donationPercent}
          role="progressbar"
        >
          <span className="text-2xl">
            {formatNumber(
              (Number(liveDisplayData.donationsCurrent) / Number(liveDisplayData.donationsGoal)) *
                100,
              { maxDecimals: 0 },
            )}
            %
          </span>
        </div>
        <p>Current donations: {liveDisplayData.donationsCurrent ?? "-"}</p>
        <p>Goal: {liveDisplayData.donationsGoal ?? "-"}</p>
        <p>
          We are currently at{" "}
          {formatNumber(
            (Number(liveDisplayData.donationsCurrent) / Number(liveDisplayData.donationsGoal)) *
              100,
            { maxDecimals: 0 },
          )}
          %
        </p>
      </div>

      <Image src={t("milesforheart_img")} width={1920} height={1080} alt="miles_for_heart" />
      <Link
        className="btn btn-primary btn-wide"
        href="https://thai.fit/c/mfhvr2024"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t("runRegister")}
      </Link>
      <Image src={t("bookbank_img")} width={2448} height={1262} alt="bookbank" />
      <Link className="btn btn-primary btn-wide" href="/register">
        {t("register")}
      </Link>
      <h2 className="text-center text-xl">{t("stepsTitle")}</h2>
      <ol className="list-inside list-decimal">
        <li>
          {t("steps1")}
          <ol className="ml-4 list-inside list-decimal">
            <li>{t("steps1_1")}</li>
            <li>
              {t("steps1_2")}
              <ol className="ml-4 list-inside list-decimal">
                <li>{t("steps1_2_1")}</li>
                <li>{t("steps1_2_2")}</li>
              </ol>
            </li>
            <li>{t("steps1_3")}</li>
          </ol>
        </li>
        <li>{t("steps2")}</li>
        <li>{t("steps3")}</li>
      </ol>
      <p className="text-red-700">{t("stepsNote")}</p>
    </div>
  );
}
