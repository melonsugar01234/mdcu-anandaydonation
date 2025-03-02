"use client";

import React, { useState } from "react";
import type { Province, District, SubDistrict } from "@/types/address";
import { useLanguage } from "../context/LanguageContext";

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
  const [payment_amount, setpayment_amount] = useState<string>("");
  const [card, setCard] = useState<string>("");
  const [wantsShirt, setWantsShirt] = useState<boolean>(false);
  const [shirts, setShirts] = useState<
    { size: string; color: string; amount: number }[]
  >([]);
  const { language } = useLanguage();

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
    const shirtData = shirts
      .map((shirt) => `${shirt.size}-${shirt.color}-${shirt.amount}`)
      .join(";");

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
          payment_amount,
          card,
          shirts: shirtData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new register");
      }

      const result = await response.json();
      console.log("New register created:", result);
      // Redirect to success page with tracking code
      window.location.href = `/donationsuccess?trackingCode=${
        result.tracking_code
      }&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(
        phone
      )}&email=${encodeURIComponent(email)}&home=${encodeURIComponent(
        fullAddress
      )}&payment_amount=${encodeURIComponent(
        payment_amount
      )}&card=${encodeURIComponent(card)}&shirts=${encodeURIComponent(
        shirtData
      )}`;
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const addShirtOption = () => {
    setShirts([...shirts, { size: "M", color: "white", amount: 1 }]);
  };

  const removeShirtOption = () => {
    setShirts(shirts.slice(0, -1));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col space-y-4 w-full max-w-4xl mx-auto ${
          language === "th" ? "" : "hidden"
        }`}
      >
        <div className="text-3xl text-center">ผู้บริจาค</div>
        <span className="text-xl">ชื่อ-นามสกุล</span>
        <input
          required
          type="text"
          placeholder="เช่น นายสมชาย ใจดี"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="text-xl">เบอร์โทรศัพท์</span>
        <input
          required
          type="tel"
          placeholder="เช่น 081-901-xxxx"
          className="input input-bordered w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span className="text-xl">email (ถ้ามี)</span>
        <input
          type="email"
          placeholder="เช่น steve@gmail.com"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="space-y-4">
          <span className="text-xl">ที่อยู่จัดส่ง</span>
          <input
            required
            type="text"
            placeholder="บ้านเลขที่ หมู่บ้าน/อาคาร ถนน"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="input input-bordered w-full"
          />

          <select
            required
            className="select select-bordered w-full"
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
            className="select select-bordered w-full"
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
            className="select select-bordered w-full"
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
            className="select select-bordered w-full"
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
        <div className="text-3xl text-center">ข้อมูลการบริจาค</div>
        <span className="text-xl">จำนวนเงินที่ต้องการบริจาค</span>
        <input
          required
          type="number"
          placeholder="ใส่แค่ตัวเลข"
          className="input input-bordered w-full"
          value={payment_amount}
          onChange={(e) => setpayment_amount(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
        />

        <div className="flex justify-center w-full">
          <img
            src="/images/card123.jpg"
            alt="banner_1"
            className="w-full h-auto object-contain"
          />
        </div>
        <span className="text-xl">เช็มที่ระลึก</span>
        <span className="text-xl">
          จำนวนเข็มที่ต้องการรับ (เงินบริจาค 150 บาทต่อเข็มที่ระลึก 1 เข็ม
          สูงสุด 3 เข็ม)
        </span>
        <select
          required
          className="select select-bordered w-full"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        >
          <option value="">เลือกจำนวนเข็ม</option>
          <option value="1">1 เข็ม</option>
          <option value="2">2 เข็ม</option>
          <option value="3">3 เข็ม</option>
        </select>
        <span className="text-xl">เสื้อที่ระลึก</span>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              checked={wantsShirt}
              onChange={() => setWantsShirt(!wantsShirt)}
            />
            ต้องการรับเสื้อ
          </label>
          <label>
            <input
              type="checkbox"
              checked={!wantsShirt}
              onChange={() => setWantsShirt(!wantsShirt)}
            />
            ไม่ต้องการรับเสื้อ
          </label>
        </div>
        {wantsShirt && (
          <div className="space-y-4">
            {shirts.map((shirt, index) => (
              <div key={index} className="flex space-x-4">
                <select
                  value={shirt.size}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index ? { ...s, size: e.target.value } : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                  <option value="3xl">3XL</option>
                </select>
                <select
                  value={shirt.color}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index ? { ...s, color: e.target.value } : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  <option value="white">White</option>
                  <option value="red">Red</option>
                </select>
                <select
                  value={shirt.amount}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index
                          ? { ...s, amount: parseInt(e.target.value) }
                          : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  {[...Array(7)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={addShirtOption}
                className="btn btn-secondary"
              >
                เพิ่มเสื้อ
              </button>
              <button
                type="button"
                onClick={removeShirtOption}
                className="btn btn-secondary"
              >
                เอาออก
              </button>
            </div>
          </div>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">
              หลักฐานการชำระเงิน (ไฟล์ .jpg, .png ขนาดไม่เกิน 5MB)
            </span>
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {paymentProof && (
            <div className="mt-2">
              <img
                src={paymentProof}
                alt="Payment proof preview"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary self-end">
          ยืนยัน →
        </button>
      </form>
      {/* english edit */}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col space-y-4 w-full max-w-4xl mx-auto ${
          language === "en" ? "" : "hidden"
        }`}
      >
        <div className="text-3xl text-center">Profile information</div>
        <span className="text-xl">Name</span>
        <input
          required
          type="text"
          placeholder="ex Mr. Somchai Jaidi"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="text-xl">Phone number</span>
        <input
          required
          type="tel"
          placeholder="ex 081-901-xxxx"
          className="input input-bordered w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span className="text-xl">email (optional)</span>
        <input
          type="email"
          placeholder="ex steve@gmail.com"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="space-y-4">
          <span className="text-xl">Address for shiping</span>
          <input
            required
            type="text"
            placeholder="House number, Village/building, Road"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="input input-bordered w-full"
          />

          <select
            required
            className="select select-bordered w-full"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Select province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name_en}
              </option>
            ))}
          </select>

          <select
            required
            className="select select-bordered w-full"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedProvince}
          >
            <option value="">Select district</option>
            {filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name_en}
              </option>
            ))}
          </select>

          <select
            required
            className="select select-bordered w-full"
            value={selectedSubDistrict}
            onChange={handleSubDistrictChange}
            disabled={!selectedDistrict}
          >
            <option value="">Select subdistrict</option>
            {filteredSubDistricts.map((subDistrict) => (
              <option key={subDistrict.id} value={subDistrict.id}>
                {subDistrict.name_en}
              </option>
            ))}
          </select>

          <select
            required
            className="select select-bordered w-full"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            disabled={!selectedSubDistrict}
          >
            <option value="">Postal code</option>
            {availablePostalCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="text-3xl text-center">Donation</div>
        <span className="text-xl">Donation amount</span>
        <input
          required
          type="number"
          placeholder="put in only numbers"
          className="input input-bordered w-full"
          value={payment_amount}
          onChange={(e) => setpayment_amount(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
        />

        <span className="text-xl">commemorable card</span>
        <div className="flex justify-center w-full">
          <img
            src="/images/card123.jpg"
            alt="banner_1"
            className="w-full h-auto object-contain"
          />
        </div>
        <span className="text-xl">
          amount of card to receive (1 card for each 150 baht donated up to 3
          cards)
        </span>
        <select
          required
          className="select select-bordered w-full"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        >
          <option value="">select amount</option>
          <option value="1">1 card</option>
          <option value="2">2 cards</option>
          <option value="3">3 cards</option>
        </select>
        <span className="text-xl">commemorable shirts</span>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              checked={wantsShirt}
              onChange={() => setWantsShirt(!wantsShirt)}
            />
            I would like to receive shirts
          </label>
          <label>
            <input
              type="checkbox"
              checked={!wantsShirt}
              onChange={() => setWantsShirt(!wantsShirt)}
            />
            I do not want to receive shirts
          </label>
        </div>
        {wantsShirt && (
          <div className="space-y-4">
            {shirts.map((shirt, index) => (
              <div key={index} className="flex space-x-4">
                <select
                  value={shirt.size}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index ? { ...s, size: e.target.value } : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                  <option value="3xl">3XL</option>
                </select>
                <select
                  value={shirt.color}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index ? { ...s, color: e.target.value } : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  <option value="white">White</option>
                  <option value="red">Red</option>
                </select>
                <select
                  value={shirt.amount}
                  onChange={(e) =>
                    setShirts(
                      shirts.map((s, i) =>
                        i === index
                          ? { ...s, amount: parseInt(e.target.value) }
                          : s
                      )
                    )
                  }
                  className="select select-bordered"
                >
                  {[...Array(7)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={addShirtOption}
                className="btn btn-secondary"
              >
                Add Shirt
              </button>
              <button
                type="button"
                onClick={removeShirtOption}
                className="btn btn-secondary"
              >
                Remove Shirt
              </button>
            </div>
          </div>
        )}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xl">
              Payment slip (File .jpg, .png size less than 5MB)
            </span>
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {paymentProof && (
            <div className="mt-2">
              <img
                src={paymentProof}
                alt="Payment proof preview"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary self-end">
          submit →
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
