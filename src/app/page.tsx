"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
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
      
      <div
        className={`text-slate-900 flex flex-col items-center gap-4 p-4 bg-stone-100 ${
          clientLanguage === "th" ? "" : "hidden"
        }`}
      >
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/Logo2.png"
            alt="banner_1"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="divider"></div>
        {/* <h1 className="text-xl font-bold">
          'Miles for Heart' Virtual Walk and Run เปิดรับสมัครแล้ววันนี้
        </h1>
        <h1 className="text-xl font-bold">
          มาร่วมเดิน-วิ่งเพื่อสุขภาพไปด้วยกันนะคะ
        </h1>
        <h2 className="font-bold">
          {" "}
          Facebook : ANAN DAY Instagram: @anan_day หรือบนเว็บไซต์นี้
        </h2>
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/miles_for_heart.jpg"
            alt="miles_for_heart"
            className="w-full h-auto object-cover"
          />
        </div>
          <Link
            href="https://thai.fit/c/mfhvr2024"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-wide bg-yellow2025 text-white"
          >
            ลงทะเบียนงานวิ่ง
          </Link> */}
        
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/newpayQR.png"
            alt="bookbank"
            className="w-full h-auto object-contain"
          />
        </div>
          <Link
            href="/register"
            className="btn btn-wide bg-yellow2025 text-white"
          >
            ลงทะเบียน
          </Link>
        <h2 className="text-xl">
          ขั้นตอนการขอรับเข็มหรือเสื้อยืดที่ระลึกวันอานันทมหิดล
        </h2>
        <ol className="list-decimal list-inside">
          <li>
            กรอกข้อมูลการบริจาค
            <ol className="list-decimal list-inside ml-4">
              <li>จํานวนเงินที่ประสงค์จะบริจาค</li>
              <li>
                ระบุจํานวนเสื้อ หรือ เข็ม หรือ เสื้อและเข็ม
                ที่ผู้บริจาคประสงค์จะรับในวงเงินที่บริจาค
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน
                  </li>
                  <li>
                    เงินบริจาคทุก 250 บาท สามารถรับชุดเข็มที่ระลึกพร้อมกล่อง 1 ชุด
                  </li>
                  <li>
                    เงินบริจาคทุก 350 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว
                  </li>
                </ol>
              </li>
              <li>หมายเหตุ: จัดส่งฟรีไม่เสียค่าจัดส่งเพิ่มเติม</li>
            </ol>
          </li>
          <li>แนบหลักฐานการโอนเงิน(สลิป)</li>
          <li>กดยืนยัน</li>
        </ol>
        <p className="text-red-700">
          ทางคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          จะดําเนินการส่งเข็มและเสื้อโดยทําการสรุปยอดทุกวันที่ 1 ของทุกเดือนเวลา
          12.00 น. และจะทําการจัดส่งภายใน 3 สัปดาห์หลังจากสรุปยอด
          เวลาที่แจ้งเป็นแค่การประมาณ อาจล่าช้าตามการผลิต
        </p>
      </div>
      <div
        className={`flex flex-col items-center gap-4 bg-stone-100 text-black p-4 ${
          clientLanguage === "en" ? "" : "hidden"
        }`}
      >
        <div className="w-full max-w-[1000px] mx-auto">
          <img src="/images/Logo2.png" alt="banner_1" />
        </div>
        <div className="divider"></div>
        {/* <h1 className="text-xl font-bold">
          'Miles for Heart' Virtual Walk and Run is now open for registration
        </h1>
        <h1 className="text-xl font-bold">
          join us for a virtual walk and run for health
        </h1>
        <h2 className="font-bold">
          {" "}
          Facebook : ANAN DAY Instagram: @anan_day or on this website
        </h2>
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/miles_for_heart.jpg"
            alt="miles_for_heart"
            className="w-full h-auto object-cover"
          />
        </div>
        <Link
          href="https://thai.fit/c/mfhvr2024"
          rel="noopener noreferrer"
          target="_blank"
          className="btn btn-wide bg-yellow2025 text-white"
        >
          Register for the virtual walk & run
        </Link> */}
        <div className="w-full max-w-[1000px] mx-auto">
          <img
            src="/images/newpayQR.png"
            alt="bookbank"
            className="w-full h-auto object-contain"
          />
        </div>
        <Link href="/register" className="btn btn-wide bg-yellow2025 text-white">
          Register
        </Link>
        <h2 className="text-xl">
          How to request a card or T-shirt commemorating Ananda Mahidol
        </h2>
        <ol className="list-decimal list-inside">
          <li>
            Fill in donation information
            <ol className="list-decimal list-inside ml-4">
              <li>Donation amount</li>
              <li>
                Number of T-shirts or cards that the donor wants to receive in
                the donation amount
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    For each 150 baht donated, you can receive 1 commemorative pin with postcard
                  </li>
                  <li>For each 250 baht donated, you can receive 1 set of commemorative pin with box</li>
                  <li>For each 350 baht donated, you can receive 1 T-shirt</li>
                </ol>
              </li>
              <li>Note: Shipping is free</li>
            </ol>
          </li>
          <li>Atttach donation proof(slip)</li>
          <li>Press submit</li>
        </ol>
        <p className="text-red-700">
          "The Faculty of Medicine, Chulalongkorn University, will proceed with
          sending cards and shirts after total up the donation amount on the 1st
          of every month at 12:00 PM. The delivery will be made within 3 weeks
          after the process is completed. The notified time is just an estimate
          and can be delayed depending on the production process."
        </p>
      </div>
      <Footer />
    </>
  );
}
