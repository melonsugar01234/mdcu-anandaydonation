"use client";

import React, { useState } from "react";
import type { Province, District, SubDistrict } from "@/types/address";

interface RegisterFormProps {
  provinces: Province[];
  districts: District[];
  subDistricts: SubDistrict[];
}

const RegisterForm = ({
  provinces,
  districts,
  subDistricts,
}: RegisterFormProps) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [availablePostalCodes, setAvailablePostalCodes] = useState<string[]>(
    []
  );
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentProof, setPaymentProof] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPaymentProof(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

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

    const subDistrictPostalCodes = subDistricts
      .filter((sd) => sd.district_id === selectedDistrict)
      .map((sd) => sd.postal_code)
      .filter((value, index, self) => self.indexOf(value) === index);

    setAvailablePostalCodes(subDistrictPostalCodes);
    setPostalCode(subDistrictPostalCodes[0] || "");
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

    return `${addressDetail} แขวง/ตำบล ${
      selectedSubDistrictName || ""
    } เขต/อำเภอ ${selectedDistrictName || ""} จังหวัด ${
      selectedProvinceName || ""
    } รหัสไปรษณีย์ ${postalCode} `.trim();
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
          payment_proof: paymentProof,
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
      setPaymentProof("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">
            หลักฐานการชำระเงิน (ไฟล์ .jpg, .png ขนาดไม่เกิน 5MB)
          </span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageUpload}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        {paymentProof && (
          <div className="mt-2">
            <img
              src={paymentProof}
              alt="Payment proof preview"
              className="max-w-xs rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary self-end">
        ต่อไป →
      </button>
    </form>
  );
};

export default RegisterForm;
