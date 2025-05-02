"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext"; // Adjust the path as necessary
import Footer from "../components/Footer"; // Import the Footer component
import Navbar from "../components/Navbar";

export default function ForgotTrackPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trackingCodes, setTrackingCodes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const { language } = useLanguage(); // Get the language from context

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTrackingCodes([]);

    if (!name.trim() || !phone.trim()) {
      setError("Please enter both name and phone number");
      return;
    }

    try {
      const response = await fetch(
        `/api/searchforgottrack?name=${encodeURIComponent(
          name
        )}&phone=${encodeURIComponent(phone)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tracking code");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No matching registration found");
      } else {
        setTrackingCodes(
          data.map((item: { tracking_code: string }) => item.tracking_code)
        );
      }
    } catch (err) {
      setError("Error searching for registration");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">
            {language === "th"
              ? "ค้นหาจากชื่อและเบอร์โทร"
              : "Search by Name and Phone"}
          </h1>
          <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              placeholder={language === "th" ? "ชื่อ" : "Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
              required
            />
            <input
              type="tel"
              placeholder={language === "th" ? "เบอร์โทร" : "Phone Number"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered"
              required
            />
            <button type="submit" className="btn btn-secondary text-white mt-2">
              {language === "th" ? "ค้นหา" : "Search"}
            </button>
          </form>
          {error && <div className="alert alert-error mb-4">{error}</div>}
          {trackingCodes.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">
                {language === "th"
                  ? "รหัสติดตามของคุณคือ : "
                  : "Your tracking code(s): "}
              </h2>
              <ul className="list-disc list-inside">
                {trackingCodes.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4 text-center">
            <Link href="/track" className="underline">
              {language === "th" ? "ติดตามสถานะ" : "View Status"}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
