"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Province, District, SubDistrict } from "@/types/address";

const RegisterPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [availablePostalCodes, setAvailablePostalCodes] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedSubDistrict("");
    setPostalCode("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedSubDistrict("");
    setPostalCode("");
  };

  const handleSubDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubDistrict(e.target.value);

    // Find all postal codes for the selected subdistrict
    const subDistrictPostalCodes = subDistricts
      .filter((sd) => sd.district_id === selectedDistrict)
      .map((sd) => sd.postal_code)
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

    setAvailablePostalCodes(subDistrictPostalCodes);
    setPostalCode(subDistrictPostalCodes[0] || ""); // Set first postal code as default
  };

  const filteredDistricts = districts.filter(
    (district) => district.province_id.toString() === selectedProvince
  );

  const filteredSubDistricts = subDistricts.filter(
    (subDistrict) => subDistrict.district_id === selectedDistrict
  );

  const getFullAddress = () => {
    const selectedProvinceName = provinces.find(
      (p) => p.id.toString() === selectedProvince
    )?.name_th;
    const selectedDistrictName = districts.find(
      (d) => d.id.toString() === selectedDistrict
    )?.name_th;
    const selectedSubDistrictName = subDistricts.find(
      (s) => s.id === selectedSubDistrict
    )?.name_th;

    return `${addressDetail} แขวง/ตำบล ${selectedSubDistrictName || ""} เขต/อำเภอ ${
      selectedDistrictName || ""
    } จังหวัด ${selectedProvinceName || ""} รหัสไปรษณีย์ ${postalCode} `.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = getFullAddress();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          home: fullAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new register");
      }

      const result = await response.json();
      console.log("New register created:", result);
      // Reset form fields
      setName("");
      setPhone("");
      setEmail("");
      setAddressDetail("");
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedSubDistrict("");
      setPostalCode("");
    } catch (error) {
      console.error(error);
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full max-w-xs"
          >
            <span>ชื่อ-นามสกุล</span>
            <input
              required
              type="text"
              placeholder="เช่น นายสมชาย ใจดี"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>เบอร์โทรศัพท์</span>
            <input
              required
              type="tel"
              placeholder="เช่น 081-901-xxxx"
              className="input input-bordered w-full max-w-xs"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span>email (ถ้ามี)</span>
            <input
              type="email"
              placeholder="เช่น steve@gmail.com"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-4">
              <span>ที่อยู่จัดส่ง</span>
              <input
                required
                type="text"
                placeholder="บ้านเลขที่ หมู่บ้าน ถนน"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />

              <select
                required
                className="select select-bordered w-full max-w-xs"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="">เลือกจังหวัด</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name_th}
                  </option>
                ))}
              </select>

              <select
                required
                className="select select-bordered w-full max-w-xs"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
              >
                <option value="">เลือกอำเภอ/เขต</option>
                {filteredDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name_th}
                  </option>
                ))}
              </select>

              <select
                required
                className="select select-bordered w-full max-w-xs"
                value={selectedSubDistrict}
                onChange={handleSubDistrictChange}
                disabled={!selectedDistrict}
              >
                <option value="">เลือกตำบล/แขวง</option>
                {filteredSubDistricts.map((subDistrict) => (
                  <option key={subDistrict.id} value={subDistrict.id}>
                    {subDistrict.name_th}
                  </option>
                ))}
              </select>

              <select
                required
                className="select select-bordered w-full max-w-xs"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!selectedSubDistrict}
              >
                <option value="">เลือกรหัสไปรษณีย์</option>
                {availablePostalCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary self-end">
              ต่อไป →
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;