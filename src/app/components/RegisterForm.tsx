"use client";

import React, { useState } from "react";
import type { Province, District, SubDistrict } from "@/types/address";
import { useLanguage } from "../context/LanguageContext";

interface RegisterFormProps {
  provinces: Province[];
  districts: District[];
  subDistricts: SubDistrict[];
}

const images = [
  { src: "/images/one.jpg", alt: "Image 1" },
  { src: "/images/two.jpg", alt: "Image 2" },
  { src: "/images/three.jpg", alt: "Image 3" },
];

const RegisterForm = ({
  provinces,
  districts,
  subDistricts,
}: RegisterFormProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [shirts, setShirts] = useState<
    { size: string; color: string; amount: number }[]
  >([]);
  const [card, setCard] = useState<string>("1");
  const [cardwithbox, setCardwithbox] = useState<string>("");

  const calculateTotalShirtCost = () => {
    const totalShirts = shirts.reduce(
      (total, shirt) => total + shirt.amount,
      0
    );
    return totalShirts * 350; // Each shirt costs 350
  };
  const calculateTotalCardCost = () => {
    const totalCards = parseInt(card) || 0; // Each card costs 150
    const totalCardWithBox = parseInt(cardwithbox) || 0; // Each card with box costs 250
    return totalCards * 150 + totalCardWithBox * 250; // Total cost calculation
  };
  const totalCost = calculateTotalShirtCost() + calculateTotalCardCost();
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [availablePostalCodes, setAvailablePostalCodes] = useState<string[]>(
    []
  );
  const [selectedProvince2, setSelectedProvince2] = useState<string>("");
  const [selectedDistrict2, setSelectedDistrict2] = useState<string>("");
  const [selectedSubDistrict2, setSelectedSubDistrict2] = useState<string>("");
  const [addressDetail2, setAddressDetail2] = useState("");
  const [postalCode2, setPostalCode2] = useState("");
  const [availablePostalCodes2, setAvailablePostalCodes2] = useState<string[]>(
    []
  );
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [paymentProof, setPaymentProof] = useState<string>("");
  const [payment_amount, setpayment_amount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // New state for payment method
  const [wantsShirt, setWantsShirt] = useState<boolean>(true);

  const [wantsReceipt, setWantsReceipt] = useState<boolean>(true);
  const [nationalId, setNationalId] = useState<string>("");
  const [nameOnReceipt, setNameOnReceipt] = useState<string>("");
  const { language } = useLanguage();

  // Add function to validate card selection based on payment amount
  const validateCardSelection = (amount: string, selectedCard: string) => {
    const numAmount = parseInt(amount) || 0;
    const numCard = parseInt(selectedCard) || 0;

    if (numAmount < 150) {
      // Allow both "0" and empty string when amount is less than 150
      return selectedCard === "" ? "" : "0";
    } else if (numAmount >= 150 && numAmount < 300) {
      // Allow only card 0 and 1 when amount is between 150-299
      return selectedCard === "0" || selectedCard === "1" ? selectedCard : "0";
    } else if (numAmount >= 300 && numAmount < 450) {
      // Allow cards 0, 1, and 2 when amount is between 300-449
      return selectedCard === "0" ||
        selectedCard === "1" ||
        selectedCard === "2"
        ? selectedCard
        : "0";
    } else if (numAmount >= 450) {
      // Allow all cards (0, 1, 2, 3) when amount is 450 or more
      return selectedCard;
    }
    return selectedCard;
  };

  // Update card when payment amount changes
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAmount = e.target.value;
    setpayment_amount(newAmount);
    setCard(validateCardSelection(newAmount, card));
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    // Check file size (limit to 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      alert("File size should be less than 5MB");
      return;
    }

    // Temporarily store the file
    setSelectedFile(file);

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
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

  const handleProvinceChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince2(e.target.value);
    setSelectedDistrict2("");
    setSelectedSubDistrict2("");
    setPostalCode2("");
  };

  const handleDistrictChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict2(e.target.value);
    setSelectedSubDistrict2("");
    setPostalCode2("");
  };

  const handleSubDistrictChange2 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubDistrict2(e.target.value);

    const subDistrictPostalCodes2 = subDistricts
      .filter((sd) => sd.district_id === selectedDistrict2)
      .map((sd) => sd.postal_code)
      .filter((value, index, self) => self.indexOf(value) === index);

    setAvailablePostalCodes2(subDistrictPostalCodes2);
    setPostalCode2(subDistrictPostalCodes2[0] || "");
  };

  const filteredDistricts2 = districts.filter(
    (district) => district.province_id.toString() === selectedProvince2
  );

  const filteredSubDistricts2 = subDistricts.filter(
    (subDistrict) => subDistrict.district_id === selectedDistrict2
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

  const getFullAddressforReceipt = () => {
    const selectedProvinceName2 = provinces.find(
      (p) => p.id.toString() === selectedProvince2
    )?.name_th;
    const selectedDistrictName2 = districts.find(
      (d) => d.id.toString() === selectedDistrict2
    )?.name_th;
    const selectedSubDistrictName2 = subDistricts.find(
      (s) => s.id === selectedSubDistrict2
    )?.name_th;

    return `${addressDetail2} แขวง/ตำบล ${
      selectedSubDistrictName2 || ""
    } เขต/อำเภอ ${selectedDistrictName2 || ""} จังหวัด ${
      selectedProvinceName2 || ""
    } รหัสไปรษณีย์ ${postalCode2} `.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image before submitting.");
      return;
    }

    // Upload the image first
    const formData = new FormData();
    formData.append("payment_proof", selectedFile);

    try {
      console.log("⏳ Uploading file...");
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("❌ Upload error:", errorText);
        alert("Something went wrong while uploading. Please try again.");
        return;
      }

      const uploadData = await uploadResponse.json();
      if (!uploadData.filePath) {
        console.error("❌ No file path returned from API!");
        alert("No file path returned. Upload failed.");
        return;
      }

      console.log("✅ File uploaded successfully:", uploadData.filePath);
      setPaymentProof(uploadData.filePath); // Save uploaded file path

      // Prepare the form submission data
      const fullAddress = getFullAddress();
      const fullAddressforReceipt = getFullAddressforReceipt();
      const shirtData = shirts
        .map((shirt) => `${shirt.size}-${shirt.color}-${shirt.amount}`)
        .join(";");

      const requestData = {
        name,
        phone,
        email,
        home: fullAddress,
        payment_proof: uploadData.filePath, // Use uploaded file path
        payment_amount,
        card: parseInt(card),
        cardwithbox: parseInt(cardwithbox),
        shirts: shirtData,
        receipt: wantsReceipt ? "yes" : "no",
        payment_method: paymentMethod,
        national_id: wantsReceipt ? nationalId : "",
        name_on_receipt: wantsReceipt ? nameOnReceipt : "",
        address_on_receipt: wantsReceipt ? fullAddressforReceipt : "",
      };

      console.log("📤 Submitting form data:", requestData);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Submission error:", errorText);
        return;
      }

      const result = await response.json();
      console.log("✅ Registration successful:", result);

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
      )}&cardwithbox=${encodeURIComponent(cardwithbox)}`;
    } catch (error) {
      console.error("❌ Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const addShirtOption = () => {
    setShirts([...shirts, { size: "xs", color: "white", amount: 1 }]);
  };

  const removeShirtOption = () => {
    setShirts(shirts.slice(0, -1));
  };

  return (
    <>
      <div className="px-2 py-6">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col space-y-4 w-full max-w-4xl mx-auto ${
            language === "th" ? "" : "hidden"
          }`}
        >
          <span className="text-xl">ชื่อ-นามสกุล</span>
          <input
            required
            type="text"
            placeholder="เช่น นายสมชาย ใจดี"
            className="input input-bordered w-full bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="text-xl">เบอร์โทรศัพท์</span>
          <input
            required
            type="tel"
            placeholder="เช่น 081-901-xxxx"
            className="input input-bordered w-full bg-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className="text-xl">Email (ถ้ามี)</span>
          <input
            type="email"
            placeholder="เช่น steve@gmail.com"
            className="input input-bordered w-full bg-white"
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
              className="input input-bordered w-full bg-white"
            />

            <select
              required
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
            placeholder="กรุณากรอกเป็นตัวเลข"
            className="input input-bordered w-full bg-white"
            value={payment_amount}
            onChange={(e) => setpayment_amount(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <div className="font-light">
            หมายเหตุ
            <div>
              เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน
            </div>
            <div>
              เงินบริจาคทุก 250 บาท สามารถรับชุดเข็มที่ระลึกพร้อมกล่อง 1 ชุด
            </div>
            <div>เงินบริจาคทุก 350 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว</div>
          </div>
          <span className="text-xl text-center">
            ตัวอย่างของที่ระลึกสำหรับผู้บริจาค (เข็มที่ระลึกพร้อมโปสการ์ด)
          </span>
          <div className="flex justify-center space-x-4">
            {images.map((image, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-transform duration-300 ease-in-out ${
                  hoveredIndex === index ? "scale-110" : "scale-90"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover" // Make the image fill the width of the container
                />
                <div className="text-center">แบบที่ {index + 1}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full max-w-[700px] mx-auto">
            <img
              src="/images/2025/postcard.jpg"
              alt="postcard"
              className="rounded-xl w-full h-auto object-contain"
            />
          </div>
          <span className="text-xl text-center">ตัวอย่างเข็มที่ระลึกและกล่อง</span>
          <img
            src="/images/2025/pinbox.jpg"
            alt="pinbox"
            className="rounded-xl w-full h-auto object-contain"
          />
          <span className="text-xl">เข็มที่ระลึก</span>
          <span className="text-xl">
            จำนวนเข็มที่ต้องการรับ (เงินบริจาค 150 บาทต่อเข็มที่ระลึก 1 เข็ม)
          </span>
          <input
            required
            type="number"
            className="input input-bordered w-full bg-white"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          ></input>
          <span className="text-xl">
            จำนวนเข็มพร้อมกล่องที่ต้องการรับ (เงินบริจาค 250 ต่อ 1 ชุด)
          </span>
          <input
            required
            type="number"
            className="input input-bordered w-full bg-white"
            value={cardwithbox}
            onChange={(e) => setCardwithbox(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          ></input>
          <span className="text-xl text-center">ตัวอย่างเสื้อที่ระลึก</span>
          <div className="flex justify-center w-full max-w-[700px] mx-auto">
            <img
              src="/images/2025/shirts.jpg"
              alt="shirts"
              className=" rounded-xl shadow-lg w-full h-auto object-contain"
            />
          </div>
          <span className="text-xl">
            เสื้อที่ระลึก (เงินบริจาค 350 บาทต่อเสื้อ 1 ตัว)
          </span>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                checked={wantsShirt}
                onChange={() => setWantsShirt(!wantsShirt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-2"
              />
              ต้องการรับเสื้อ
            </label>
            <label>
              <input
                type="checkbox"
                checked={!wantsShirt}
                onChange={() => setWantsShirt(!wantsShirt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-2"
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
                    className="select select-bordered bg-white"
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
                    className="select select-bordered bg-white"
                  >
                    <option value="white">White</option>
                    <option value="yellow">Yellow</option>
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
                    className="select select-bordered bg-white"
                  >
                    {[...Array(20)].map((_, i) => (
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
                  className="btn text-slate-950 bg-amber-400"
                >
                  เพิ่มเสื้อ
                </button>
                <button
                  type="button"
                  onClick={removeShirtOption}
                  className="btn text-slate-950 bg-amber-400"
                >
                  เอาออก
                </button>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <span className="text-xl">วิธีการบริจาค</span>
            <select
              required
              className="select select-bordered w-full bg-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">เลือกวิธีการบริจาค</option>
              <option value="QR code">QR code</option>
              <option value="Bank number">Bank number</option>
            </select>
            <img
              src="/images/2025/qr2568.jpg"
              alt="qr"
              className="rounded-xl w-full h-auto object-contain"
            />
          </div>
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
              className="file-input file-input-bordered w-full bg-white"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Payment proof preview"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Receipt Checkbox */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={wantsReceipt}
                onChange={() => setWantsReceipt(!wantsReceipt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-lg">ต้องการใบเสร็จ</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={!wantsReceipt}
                onChange={() => setWantsReceipt(!wantsReceipt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-lg">ไม่ต้องการรับใบเสร็จ</span>
            </label>
          </div>

          {/* Conditional Fields for Receipt */}
          {wantsReceipt && (
            <div className="space-y-4">
              <span className="text-xl">หมายเลขประจำตัวประชาชน</span>
              <input
                type="text"
                placeholder="กรุณากรอกเป็นตัวเลข"
                className="input input-bordered w-full mb-4 bg-white"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                maxLength={13} // Limit input to 13 characters
                pattern="\d{13}" // Ensure only 13 digits are allowed
                title="หมายเลขประจำตัวประชาชนต้องมี 13 หลัก" // Tooltip for user guidance
              />
              <div className="space-y-4">
                <span className="text-xl">
                  ชื่อ-นามสกุลที่ต้องการให้ปรากฎในใบเสร็จ
                </span>
              </div>
              <input
                required
                type="text"
                placeholder="เช่น นายสมชาย ใจดี"
                className="input input-bordered w-full bg-white"
                value={nameOnReceipt}
                onChange={(e) => setNameOnReceipt(e.target.value)}
              />
              <div className="space-y-4">
                <span className="text-xl">
                  ที่อยู่ที่ต้องการให้ปรากฎในใบเสร็จ
                </span>
                <input
                  required
                  type="text"
                  placeholder="บ้านเลขที่ หมู่บ้าน/อาคาร ถนน"
                  value={addressDetail2}
                  onChange={(e) => setAddressDetail2(e.target.value)}
                  className="input input-bordered w-full bg-white"
                />

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={selectedProvince2}
                  onChange={handleProvinceChange2}
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
                  className="select select-bordered w-full bg-white"
                  value={selectedDistrict2}
                  onChange={handleDistrictChange2}
                  disabled={!selectedProvince2}
                >
                  <option value="">เลือกอำเภอ/เขต</option>
                  {filteredDistricts2.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name_th}
                    </option>
                  ))}
                </select>

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={selectedSubDistrict2}
                  onChange={handleSubDistrictChange2}
                  disabled={!selectedDistrict2}
                >
                  <option value="">เลือกตำบล/แขวง</option>
                  {filteredSubDistricts2.map((subDistrict) => (
                    <option key={subDistrict.id} value={subDistrict.id}>
                      {subDistrict.name_th}
                    </option>
                  ))}
                </select>

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={postalCode2}
                  onChange={(e) => setPostalCode2(e.target.value)}
                  disabled={!selectedSubDistrict2}
                >
                  <option value="">เลือกรหัสไปรษณีย์</option>
                  {availablePostalCodes2.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <div className="font-bold text-xl text-center">สรุปรายการ</div>
            {/* <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                มูลค่าของที่ระลึกรวม:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalShirtCost() + calculateTotalCardCost()} บาท
              </span>
            </div> */}
            {/* <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                มูลค่ารวมของเข็มที่ระลึก:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalCardCost()} บาท
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                มูลค่ารวมของเสื้อที่ระลึก:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalShirtCost()} บาท
              </span>
            </div> */}

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                ยอดรวมการร่วมบริจาคทั้งหมด
              </span>
              <span className="text-lg font-bold">{payment_amount} บาท</span>
            </div>
            <div className="text-red-700">
              โปรดตรวจสอบข้อมูลของท่านก่อนกดยืนยัน
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary self-end"
            disabled={parseFloat(payment_amount) < totalCost} // Disable if payment_amount is less than totalCost
          >
            {" "}
            ยืนยัน →
          </button>
          {parseFloat(payment_amount) < totalCost && (
            <p className="flex justify-end text-red-500 text-sm">
              ยอดบริจาคต้องไม่น้อยกว่าราคารวม
            </p>
          )}
        </form>
        {/* english edit */}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col space-y-4 w-full max-w-4xl mx-auto ${
            language === "en" ? "" : "hidden"
          }`}
        >
          {/* <div className="text-3xl text-center">Profile Information</div> */}
          <span className="text-xl">Name</span>
          <input
            required
            type="text"
            placeholder="Ex. Mr. Somchai Jaidi"
            className="input input-bordered w-full bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="text-xl">Phone number</span>
          <input
            required
            type="tel"
            placeholder="Ex. 081-901-xxxx"
            className="input input-bordered w-full bg-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className="text-xl">Email (optional)</span>
          <input
            type="email"
            placeholder="Ex. steve@gmail.com"
            className="input input-bordered w-full bg-white"
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
              className="input input-bordered w-full bg-white"
            />

            <select
              required
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
              className="select select-bordered w-full bg-white"
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
            placeholder="Only numbers"
            className="input input-bordered w-full bg-white"
            value={payment_amount}
            onChange={(e) => setpayment_amount(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <div className="font-light">
            Note
            <div>
              For each 150 baht donated, you can receive 1 commemorative pin
              with postcard
            </div>
            <div>
              For each 250 baht donated, you can receive 1 set of commemorative
              pin with box
            </div>
            <div>For each 350 baht donated, you can receive 1 T-shirt</div>
          </div>

          <span className="text-xl text-center">Souvenir example (Pin and postcard)</span>

          <div className="flex justify-center space-x-4">
            {images.map((image, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-transform duration-300 ease-in-out ${
                  hoveredIndex === index ? "scale-110" : "scale-90"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover" // Make the image fill the width of the container
                />
                <div className="text-center">Design {index + 1}</div>
              </div>
            ))}
          </div>
          <span className="text-xl text-center">Memorial pin and box example</span>

          <div className="flex justify-center w-full">
            <img
              src="/images/2025/pinbox.jpg"
              alt="pinbox"
              className="rounded-xl w-full h-auto object-contain"
            />
          </div>
          <span className="text-xl">
            Amount of postcard and pin to receive (1 card for each 150 baht
            donated)
          </span>
          <input
            required
            type="number"
            className="input input-bordered w-full bg-white"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          ></input>
          <span className="text-xl">
            Amount of postcard and pin with box to receive (1 set for each 250
            baht donated)
          </span>
          <input
            required
            type="number"
            className="input input-bordered w-full bg-white"
            value={cardwithbox}
            onChange={(e) => setCardwithbox(e.target.value)}
            onWheel={(e) => e.currentTarget.blur()}
          ></input>
          <span className="text-xl text-center">T-Shirts example</span>

          <div className="flex justify-center w-full max-w-[700px] mx-auto">
            <img
              src="/images/2025/shirts.jpg"
              alt="shirts"
              className=" rounded-xl shadow-lg w-full h-auto object-contain"
            />
          </div>
          <span className="text-xl">
            Memorials shirts (1 T-shirt for each 350 baht donated)
          </span>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                checked={wantsShirt}
                onChange={() => setWantsShirt(!wantsShirt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-2"
              />
              I would like to receive shirts
            </label>
            <label>
              <input
                type="checkbox"
                checked={!wantsShirt}
                onChange={() => setWantsShirt(!wantsShirt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-2"
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
                    className="select select-bordered bg-white"
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
                    className="select select-bordered bg-white"
                  >
                    <option value="white">White</option>
                    <option value="yellow">Yellow</option>
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
                    className="select select-bordered bg-white"
                  >
                    {[...Array(20)].map((_, i) => (
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
                  className="btn text-slate-950 bg-amber-400"
                >
                  Add Shirt
                </button>
                <button
                  type="button"
                  onClick={removeShirtOption}
                  className="btn text-slate-950 bg-amber-400"
                >
                  Remove Shirt
                </button>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <span className="text-xl">Donation method</span>
            <select
              required
              className="select select-bordered w-full bg-white"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Choose donation method</option>
              <option value="QR code">QR code</option>
              <option value="Bank number">Bank number</option>
            </select>
            <img
              src="/images/2025/qr2568.jpg"
              alt="qr"
              className="rounded-xl w-full h-auto object-contain"
            />
          </div>
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
              className="file-input file-input-bordered w-full bg-white"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Payment proof preview"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Receipt Checkbox */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={wantsReceipt}
                onChange={() => setWantsReceipt(!wantsReceipt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-lg">I would like a receipt</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={!wantsReceipt}
                onChange={() => setWantsReceipt(!wantsReceipt)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-lg">I don't want a receipt</span>
            </label>
          </div>

          {/* Conditional Fields for Receipt */}
          {wantsReceipt && (
            <div className="space-y-4">
              <span className="text-xl">National ID</span>
              <input
                type="text"
                placeholder="Numbers only"
                className="input input-bordered w-full bg-white"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                maxLength={13} // Limit input to 13 characters
                pattern="\d{13}" // Ensure only 13 digits are allowed
                title="pls enter 13 digit for national id" // Tooltip for user guidance
              />
              <div className="space-y-4">
                <span className="text-xl">Name on receipt</span>
              </div>
              <input
                required
                type="text"
                placeholder="Enter full name"
                className="input input-bordered w-full bg-white"
                value={nameOnReceipt}
                onChange={(e) => setNameOnReceipt(e.target.value)}
              />
              <div className="space-y-4">
                <span className="text-xl">Address on receipt</span>
                <input
                  required
                  type="text"
                  placeholder="House number, Village/building, Road"
                  value={addressDetail2}
                  onChange={(e) => setAddressDetail2(e.target.value)}
                  className="input input-bordered w-full bg-white"
                />

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={selectedProvince2}
                  onChange={handleProvinceChange2}
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
                  className="select select-bordered w-full bg-white"
                  value={selectedDistrict2}
                  onChange={handleDistrictChange2}
                  disabled={!selectedProvince2}
                >
                  <option value="">Select district</option>
                  {filteredDistricts2.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name_en}
                    </option>
                  ))}
                </select>

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={selectedSubDistrict2}
                  onChange={handleSubDistrictChange2}
                  disabled={!selectedDistrict2}
                >
                  <option value="">Select subdistrict</option>
                  {filteredSubDistricts2.map((subDistrict) => (
                    <option key={subDistrict.id} value={subDistrict.id}>
                      {subDistrict.name_en}
                    </option>
                  ))}
                </select>

                <select
                  required
                  className="select select-bordered w-full bg-white"
                  value={postalCode2}
                  onChange={(e) => setPostalCode2(e.target.value)}
                  disabled={!selectedSubDistrict2}
                >
                  <option value="">Postal code</option>
                  {availablePostalCodes2.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <div className="font-bold text-xl text-center">
              Donation summary
            </div>
            {/* <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                Total Price of Ordered Souvenirs:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalShirtCost() + calculateTotalCardCost()} baht
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                Total Price of Ordered Souvenir Pins:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalCardCost()} baht
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">
                Total Price of Ordered Souvenir Shirts:
              </span>
              <span className="text-lg font-bold">
                {calculateTotalShirtCost()} baht
              </span>
            </div> */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                Total Money Donated:
              </span>
              <span className="text-lg font-bold">{payment_amount} baht</span>
            </div>
            <div className="text-red-700">
              Please verify your registration details before submitting.
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary self-end"
            disabled={parseFloat(payment_amount) < totalCost} // Disable if payment_amount is less than totalCost
          >
            {" "}
            Submit →
          </button>
          {parseFloat(payment_amount) < totalCost && (
            <p className="flex justify-end text-red-500 text-sm">
              money donated must be greater than or equal to the total cost
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
