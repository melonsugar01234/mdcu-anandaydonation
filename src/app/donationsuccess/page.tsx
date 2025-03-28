"use client";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

export default function DonationSuccess() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get("trackingCode");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const home = searchParams.get("home");
  const payment_amount = searchParams.get("payment_amount");
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl w-full text-center border border-gray-200">
          {/* Success Emoji ✅ */}
          <div className="text-7xl mb-6">✅</div>

          {/* Confirmation Message */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {language === "en"
              ? "Your donation and order have been recorded."
              : "การบริจาคและสั่งซื้อของท่านได้ถูกบันทึกแล้ว"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {language === "en"
              ? "We will send the items to your registered address as soon as possible. Thank you for your donation and support."
              : "ทางคณะจะจัดส่งไปยังที่อยู่ที่ท่านลงทะเบียนไว้โดยเร็ว ขอบพระคุณสำหรับการบริจาคเงินและสั่งซื้อของที่ระลึกวันอานันทมหิดล"}
          </p>

          {/* Tracking Code Section */}
          <p className="text-gray-700 text-xl mb-4 font-medium">
            {language === "en" ? "Your tracking code is" : "รหัสติดตามของท่านคือ"}
          </p>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 text-4xl font-bold text-gray-900">
            {trackingCode}
          </div>

          {/* Warning Message ⚠️ */}
          <div className="mt-6 p-6 bg-red-100 border border-red-400 rounded-lg">
            <div className="text-5xl text-red-600 mb-3">⚠️</div>
            <p className="text-red-600 font-bold text-xl">
              {language === "en" ? "Please take a screenshot" : "กรุณาถ่ายภาพหน้าจอ"}
            </p>
            <p className="text-gray-800 text-lg mt-2">
              {language === "en"
                ? "The tracking code will be displayed only "
                : "เนื่องจากรหัสจะแสดงให้เห็นเพียงแค่ "}
              <span className="text-red-600 font-bold">
                {language === "en" ? "once" : "ครั้งเดียว"}
              </span>
              {language === "en"
                ? ". Please keep it as proof for tracking and store it securely to protect your personal data."
                : " จึงขอความกรุณาเก็บไว้เป็นหลักฐานเพื่อติดตาม และเก็บไว้เป็นความลับเพื่อความปลอดภัยของข้อมูลส่วนตัว"}
            </p>
          </div>

          {/* Form Info */}
          <div className="mt-8 text-left text-gray-800 border-t pt-6 text-lg">
            <p>
              <strong>{language === "en" ? "Name" : "ชื่อ-นามสกุล"}:</strong> {name}
            </p>
            <p>
              <strong>{language === "en" ? "Phone" : "โทรศัพท์"}:</strong> {phone}
            </p>
            <p>
              <strong>{language === "en" ? "Email" : "อีเมล"}:</strong> {email}
            </p>
            <p>
              <strong>{language === "en" ? "Address" : "ที่อยู่จัดส่ง"}:</strong> {home}
            </p>
            <p>
              <strong>{language === "en" ? "Donation Amount" : "จำนวนเงินที่บริจาค"}:</strong> {payment_amount}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
