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
      <h2 className="text-center text-xl">
        ขั้นตอนการขอรับเข็ม หรือเสื้อยืด ที่ระลึกวันอานันทมหิดล
      </h2>
      <ol className="list-inside list-decimal">
        <li>
          กรอกข้อมูลการบริจาค
          <ol className="ml-4 list-inside list-decimal">
            <li>จํานวนเงินที่ประสงค์จะบริจาค</li>
            <li>
              ระบุจํานวนเสื้อ หรือ เข็ม หรือ เสื้อและเข็ม ที่ผู้บริจาคประสงค์จะรับในวงเงินที่บริจาค
              <ol className="ml-4 list-inside list-decimal">
                <li>เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน</li>
                <li>เงินบริจาคทุก 299 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว</li>
              </ol>
            </li>
            <li>หมายเหตุ: จัดส่งฟรีไม่เสียค่าจัดส่งเพิ่มเติม</li>
          </ol>
        </li>
        <li>แนบหลักฐานการโอนเงิน(สลิป)</li>
        <li>กดบันทึกข้อมูล</li>
      </ol>
      <p className="text-red-700">
        ทางคณะแพทยศาสตร์ จุฬา จะดําเนินการส่งเข็มและเสื้อโดยทําการสรุปยอดทุกวันที่ 1 ของทุกเดือนเวลา
        12:00 และจะทําการจัดส่ง ภายใน 3 สัปดาห์หลังจากสรุปยอด เวลาที่แจ้งเป็นแค่การประมาณ
        อาจล่าช้าตามการผลิต
      </p>
    </div>
  );
}
