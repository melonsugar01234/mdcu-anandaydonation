"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

type AlumniSummary = {
  alumni_gen: string;
  total_amount: number;
};

export default function AlumniDonation() {
  const { language } = useLanguage();
  const [alumniData, setAlumniData] = useState<AlumniSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch alumni donation summary from API
    fetch("/api/alumni-summary")
      .then((res) => res.json())
      .then((data) => {
        setAlumniData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full">
      <h1 className="text-2xl font-bold mb-4">
        {language === "th" ? "ศิษย์เก่าแพทย์จุฬาฯ ร่วมบริจาค" : "Alumni Donation"}
      </h1>
      <p className="text-lg mb-6">
        {language === "th"
          ? "ขอขอบคุณศิษย์เก่าทุกท่านที่ร่วมสนับสนุนโครงการนี้"
          : "Thank you for your support!"}
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-8">
        {language === "th" ? "ร่วมบริจาค" : "Donate Now"}
      </button>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full max-w-2xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                {language === "th" ? "รุ่นศิษย์เก่า" : "Alumni Gen"}
              </th>
              <th>
                {language === "th"
                  ? "ยอดบริจาครวม (บาท)"
                  : "Total Donation (Baht)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  {language === "th" ? "กำลังโหลด..." : "Loading..."}
                </td>
              </tr>
            ) : alumniData.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  {language === "th"
                    ? "ยังไม่มีข้อมูลการบริจาค"
                    : "No donation data yet"}
                </td>
              </tr>
            ) : (
              alumniData.map((row, idx) => (
                <tr key={row.alumni_gen}>
                  <th>{idx + 1}</th>
                  <td>{row.alumni_gen}</td>
                  <td>{row.total_amount.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}