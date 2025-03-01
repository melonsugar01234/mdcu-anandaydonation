"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import type { Province, District, SubDistrict } from "@/types/address";

const RegisterPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold mb-4">ลงทะเบียน</h1>
          <div className="text-2xl mb-4 text-center">
            <div>โครงการวันอานันทมหิดล คณะแพทยศาสตร์</div>
            <div>จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ. ๒๕๖๗</div>
          </div>
          <RegisterForm
            provinces={provinces}
            districts={districts}
            subDistricts={subDistricts}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
