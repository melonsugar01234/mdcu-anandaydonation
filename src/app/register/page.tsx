"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import type { Province, District, SubDistrict } from "@/types/address";
import { useLanguage } from "../context/LanguageContext";

const RegisterPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [donationStatus, setDonationStatus] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/address");
        if (!response.ok) {
          throw new Error("Failed to fetch address data");
        }
        const data = await response.json();
        setProvinces(data.provinces || []);
        setDistricts(data.districts || []);
        setSubDistricts(data.subDistricts || []);
      } catch (err) {
        console.error("Error fetching address data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDonationStatus = async () => {
      const response = await fetch("/api/donation-status");
      const data = await response.json();
      setDonationStatus(data.isOpen);
    };

    fetchDonationStatus();
  }, []);

  if (!donationStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">
          {language === "en"
            ? "Sorry, we are closed."
            : "ขออภัย เราได้ปิดรับสมัครแล้ว"}
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" bg-stone-100 text-slate-950">
        <div className="flex justify-center py-8">
          <img
            src="/images/Logo2.png"
            alt="logo"
            className="w-1/2 h-auto object-cover"
          />
        </div>
        <div
          className={`container mx-auto p-4  bg-stone-100 ${
            language === "th" ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-bold mb-4 text-center">
              ลงทะเบียนบริจาคและรับของที่ระลึก
            </h1>
            <div className="text-2xl mb-4 text-center">
              <div>โครงการเข็มวันอานันทมหิดล คณะแพทยศาสตร์</div>
              <div>จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ. ๒๕๖๘</div>
            </div>
            <RegisterForm
              provinces={provinces}
              districts={districts}
              subDistricts={subDistricts}
            />
          </div>
        </div>
        <div
          className={`container mx-auto p-4 bg-stone-100 ${
            language === "en" ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-5xl font-bold mb-4 text-center">
              Register for donation and ordering
            </h1>
            <div className="text-2xl mb-4 text-center">
              <div>Ananda Mahidol the Faculty of Medicine</div>
              <div>Chulalongkorn University year 2025</div>
            </div>
            <RegisterForm
              provinces={provinces}
              districts={districts}
              subDistricts={subDistricts}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
