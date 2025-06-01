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
    <div className="w-full max-w-[600px] mx-auto">
      <div className="collapse text-2xl border-base-300 border w-full text-center">
        <input type="checkbox" />
        <div className="collapse-title font-semibold min-h-[56px] flex items-center justify-center">
          {language === "th"
            ? "ศิษย์เก่าแพทย์จุฬาฯ ร่วมบริจาค"
            : "Alumni Donation"}
        </div>
        <div className="collapse-content text-sm">
          <div className="overflow-x-auto rounded-box border border-base-content/5 w-full ">
            <table className="table text-center">
              <thead>
                <tr>
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
                    <td colSpan={2} className="text-center">
                      {language === "th" ? "กำลังโหลด..." : "Loading..."}
                    </td>
                  </tr>
                ) : alumniData.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center">
                      {language === "th"
                        ? "ยังไม่มีข้อมูลการบริจาค"
                        : "No donation data yet"}
                    </td>
                  </tr>
                ) : (
                  alumniData.map((row) => (
                    <tr key={row.alumni_gen}>
                      <td className="text-center">{row.alumni_gen}</td>
                      <td className="text-center">{row.total_amount.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}