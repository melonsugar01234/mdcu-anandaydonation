"use client";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { Suspense } from "react";

// Create a client component that uses useSearchParams
function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const trackingCode = searchParams.get("trackingCode");

  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const home = searchParams.get("home");
  const payment_amount = searchParams.get("payment_amount") || "0";
  const shirts = searchParams.get("shirts") || "";
  const card = searchParams.get("card") || "0";
  const cardwithbox = searchParams.get("cardwithbox") || "";

  // Parse and calculate shirt details
  let totalShirtCount = 0;
  let shirtTotal = 0;
  let shirtDetails = "";
  if (shirts) {
    shirtDetails = shirts
      .split(";")
      .map((shirt) => {
        const [size, color, amount] = shirt.split("-");
        totalShirtCount += parseInt(amount) || 0;
        return `Size: ${size.toUpperCase()} | Color: ${
          color.charAt(0).toUpperCase() + color.slice(1)
        } | Amount: ${amount}`;
      })
      .join("\n");
    shirtTotal = totalShirtCount * 350;
  }

  // Parse pin data
  const cardCount = parseInt(card) || 0;
  const cardTotal = cardCount * 150;

  const cardwithboxCount = parseInt(cardwithbox) || 0;
  const cardwithboxTotal = cardwithboxCount * 250;

  // Calculate total amount
  const totalAmount = parseFloat(payment_amount) + shirtTotal + cardTotal;

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
              ? "Your donation has been recorded."
              : "ข้อมูลการบริจาคของท่านได้ถูกบันทึกแล้ว"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {language === "en"
              ? "We will send the items to your registered address as soon as possible. Thank you for your donation and support."
              : "ทางคณะจะจัดส่งไปยังที่อยู่ที่ท่านลงทะเบียนไว้โดยเร็ว ขอบพระคุณสำหรับการบริจาคเงินและสั่งซื้อของที่ระลึกวันอานันทมหิดล"}
          </p>

          {/* Tracking Code Section */}
          <p className="text-gray-700 text-xl mb-4 font-medium">
            {language === "en"
              ? "Your tracking code is"
              : "รหัสติดตามของท่านคือ"}
          </p>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 text-4xl font-bold text-gray-900">
            {trackingCode}
          </div>

          {/* Warning Message ⚠️ */}
          <div className="mt-6 p-6 bg-red-100 border border-red-400 rounded-lg">
            <div className="text-5xl text-red-600 mb-3">⚠️</div>
            <p className="text-red-600 font-bold text-xl">
              {language === "en"
                ? "Please take a screenshot"
                : "กรุณาถ่ายภาพหน้าจอ"}
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
              <strong>{language === "en" ? "Name" : "ชื่อ-นามสกุล"}:</strong>{" "}
              {name}
            </p>
            <p>
              <strong>{language === "en" ? "Phone" : "โทรศัพท์"}:</strong>{" "}
              {phone}
            </p>
            <p>
              <strong>{language === "en" ? "Email" : "อีเมล"}:</strong>{" "}
              {email || "-"}
            </p>
            <p>
              <strong>
                {language === "en" ? "Address" : "ที่อยู่จัดส่ง"}:
              </strong>{" "}
              {home}
            </p>
            <p>
              <strong>
                {language === "en" ? "Donation Amount" : "จำนวนเงินที่บริจาค"}:
              </strong>{" "}
              {payment_amount}
            </p>
          </div>

          {/* Order Details Table */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">
              {language === "en" ? "Order Details" : "รายละเอียดคำสั่งซื้อ"}
            </h3>
            <table className="w-full mt-2 border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">
                    {language === "en" ? "Item" : "รายการ"}
                  </th>
                  <th className="border p-2">
                    {language === "en" ? "Quantity" : "จำนวน"}
                  </th>
                  <th className="border p-2">
                    {language === "en" ? "Price (THB)" : "ราคา (บาท)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">
                    {language === "en"
                      ? "Donation amount"
                      : "จำนวนเงินที่บริจาค"}
                  </td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">{payment_amount}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    {language === "en" ? "Commemorative Pin" : "เข็มที่ระลึก"}
                  </td>
                  <td className="border p-2">{cardCount}</td>
                  <td className="border p-2">{cardTotal}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    {language === "en" ? "Shirt" : "เสื้อที่ระลึก"}
                  </td>
                  <td className="border p-2">{totalShirtCount}</td>
                  <td className="border p-2">{shirtTotal}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    {language === "en"
                      ? "Pin with box"
                      : "เข็มที่ระลึกพร้อมกล่อง"}
                  </td>
                  <td className="border p-2">{cardwithboxCount}</td>
                  <td className="border p-2">{cardwithboxTotal}</td>
                </tr>
                <tr className="font-bold bg-gray-100">
                  <td className="border p-2">
                    {language === "en" ? "Total" : "รวม"}
                  </td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">{totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Create a server component (page.tsx) that wraps the client component in Suspense
export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationSuccessContent />
    </Suspense>
  );
}
