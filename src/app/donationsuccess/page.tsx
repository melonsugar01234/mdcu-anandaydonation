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
      <div className={`container mx-auto p-4 flex-grow flex items-center justify-center ${
              language === "en" ? "" : "hidden"
            }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{trackingCode}</h1>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Address: {home}</p>
          <p>Donation Amount: {payment_amount}</p>
        </div>
      </div>
      <div className={`container mx-auto p-4 flex-grow flex items-center justify-center ${
              language === "th" ? "" : "hidden"
            }`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{trackingCode}</h1>
          <p>ชื่อ: {name}</p>
          <p>เบอร์โทร: {phone}</p>
          <p>อีเมล: {email}</p>
          <p>ที่อยู่จัดส่ง: {home}</p>
          <p>จำนวนเงินที่บริจาค: {payment_amount}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
