"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AlumniDonation() {
  const { language } = useLanguage();
  const [alumniData, setAlumniData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch alumni donation summary from API
    fetch("/api/alumni-summary")
      .then((res) => res.json())
      .then((data) => {
        // Convert array to map for easy lookup
        const map: { [key: string]: number } = {};
        data.forEach((row: { alumni_gen: string; total_amount: number }) => {
          map[row.alumni_gen] = row.total_amount;
        });
        setAlumniData(map);
        setLoading(false);
      });
  }, []);

  // Prepare rows for 1-81 gen
  const genRows = [];
  for (let i = 1; i <= 81; i++) {
    genRows.push({
      alumni_gen: String(i),
      total_amount: alumniData[String(i)] || 0,
    });
  }
  // Add "ไม่ระบุ / Unspecified" row if present in data
  if (alumniData["ไม่ระบุ / Unspecified"]) {
    genRows.push({
      alumni_gen: language === "th" ? "ไม่ระบุ" : "Unspecified",
      total_amount: alumniData["ไม่ระบุ / Unspecified"],
    });
  }

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="text-sm">
        <div className="overflow-x-auto rounded-b-box w-full ">
          <table className="table table-zebra text-center">
            <thead>
              <tr>
                <th>{language === "th" ? "รุ่นศิษย์เก่า" : "Alumni Gen"}</th>
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
              ) : (
                genRows.map((row) => (
                  <tr key={row.alumni_gen}>
                    <td className="text-center">{row.alumni_gen}</td>
                    <td className="text-center">
                      {row.total_amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
