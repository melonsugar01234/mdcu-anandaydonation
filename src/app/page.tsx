"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AlumniDonation from "./components/AlumniDonation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const [clientLanguage, setClientLanguage] = useState(language);

  useEffect(() => {
    setClientLanguage(language);
  }, [language]);

  return (
    <>
      <Navbar />

      <div className="text-slate-900 flex flex-col items-center gap-4 p-4 bg-stone-100">
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/Logo2.png"
            alt="banner_1"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="divider" />
        <div className="text-2xl mb-4 text-center">
          <div>
            {language === "th"
              ? "โครงการเข็มวันอานันทมหิดล คณะแพทยศาสตร์"
              : "Ananda Mahidol the Faculty of Medicine"}
          </div>
          <div>
            {language === "th"
              ? "จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ. ๒๕๖๘"
              : "Chulalongkorn University year 2025"}
          </div>
        </div>
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/2025/banner2.jpg"
            alt="banner_2"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="divider" />
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/2025/qr2568.jpg"
            alt="bookbank"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="my-1" />
        <Link
          href="/register"
          className="btn btn-secondary btn-wide text-white"
        >
          {language === "th" ? "ลงทะเบียน" : "Register"}
        </Link>
        <div className="divider" />

        {/* How to request collapse */}
        <div className="collapse collapse-arrow border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-2xl text-center">
            {language === "th"
              ? "ขั้นตอนการขอรับเข็มหรือเสื้อยืดที่ระลึกวันอานันทมหิดล"
              : "How to request a card or T-shirt commemorating Ananda Mahidol"}
          </div>
          <div className="collapse-content">
            <ol className="list-decimal list-inside flex flex-col items-center">
              <li className="w-full max-w-[500px]">
                {language === "th"
                  ? "กรอกข้อมูลการบริจาค"
                  : "Fill in donation information"}
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    {language === "th"
                      ? "จํานวนเงินที่ประสงค์จะบริจาค"
                      : "Donation amount"}
                  </li>
                  <li>
                    {language === "th"
                      ? "ระบุจํานวนเสื้อ หรือ เข็ม หรือ เสื้อและเข็ม ที่ผู้บริจาคประสงค์จะรับในวงเงินที่บริจาค"
                      : "Number of T-shirts or cards that the donor wants to receive in the donation amount"}
                    <ol className="list-decimal list-inside ml-4">
                      <li>
                        {language === "th"
                          ? "เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน"
                          : "For each 150 baht donated, you can receive 1 commemorative pin with postcard"}
                      </li>
                      <li>
                        {language === "th"
                          ? "เงินบริจาคทุก 250 บาท สามารถรับชุดเข็มที่ระลึกพร้อมกล่อง 1 ชุด"
                          : "For each 250 baht donated, you can receive 1 set of commemorative pin with box"}
                      </li>
                      <li>
                        {language === "th"
                          ? "เงินบริจาคทุก 350 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว"
                          : "For each 350 baht donated, you can receive 1 T-shirt"}
                      </li>
                    </ol>
                  </li>
                  <li>
                    {language === "th"
                      ? "หมายเหตุ: จัดส่งฟรีไม่เสียค่าจัดส่งเพิ่มเติม"
                      : "Note: Shipping is free"}
                  </li>
                </ol>
              </li>
              <li className="w-full max-w-[500px]">
                {language === "th"
                  ? "แนบหลักฐานการโอนเงิน(สลิป)"
                  : "Attach donation proof (slip)"}
              </li>
              <li className="w-full max-w-[500px]">
                {language === "th" ? "กดยืนยัน" : "Press submit"}
              </li>
            </ol>
          </div>
        </div>

        {/* Alumni Donation collapse */}
        <div className="collapse collapse-arrow border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-2xl text-center">
            {language === "th"
              ? "ศิษย์เก่าแพทย์จุฬาฯ ร่วมบริจาค"
              : "MDCU Alumni Donation"}
          </div>
          <div className="collapse-content">
            <AlumniDonation />
          </div>
        </div>

        <p className="text-red-700">
          {language === "th"
            ? `ทางคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
จะดําเนินการส่งเข็มและเสื้อโดยทําการสรุปยอดทุกวันที่ 1 ของทุกเดือนเวลา
12.00 น. และจะทําการจัดส่งภายใน 3 สัปดาห์หลังจากสรุปยอด
เวลาที่แจ้งเป็นแค่การประมาณ อาจล่าช้าตามการผลิต`
            : `The Faculty of Medicine, Chulalongkorn University, will proceed with
sending cards and shirts after totaling up the donation amount on the 1st
of every month at 12:00 PM. The delivery will be made within 3 weeks
after the process is completed. The notified time is just an estimate
and can be delayed depending on the production process.`}
        </p>
      </div>
      <Footer />
    </>
  );
}
