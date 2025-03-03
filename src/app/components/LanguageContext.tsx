"use client";
import { createContext, useContext, useState } from "react";

interface LanguageContextType {
  language: "th" | "en";
  translations: Record<string, Record<string, string>>;
  toggleLanguage: (newLanguage: "th" | "en") => void;
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<"th" | "en">("th");

  const translations = {
    th: {
      home: "หน้าหลัก",
      register: "ลงทะเบียน",
      track: "ติดตามสถานะ",
      switch: "EN",
      title: "ลงทะเบียนผู้บริจาค ฯ",
      eventTitle: "'Miles for Heart' Virtual Walk and Run เปิดรับสมัครแล้ววันนี้",
      eventSubtitle: "มาร่วมเดิน-วิ่งเพื่อสุขภาพไปด้วยกันนะคะ",
      socialMedia: "Facebook : ANAN DAY Instagram: @anan_day หรือบนเว็บไซต์นี้",
      registerRun: "ลงทะเบียนงานวิ่ง",
      stepsTitle: "ขั้นตอนการขอรับเข็ม หรือเสื้อยืด ที่ระลึกวันอานันทมหิดล",
      donationStep1: "กรอกข้อมูลการบริจาค",
      donationAmount: "จํานวนเงินที่ประสงค์จะบริจาค",
      donationItems: "ระบุจํานวนเสื้อ หรือ เข็ม หรือ เสื้อและเข็ม ที่ผู้บริจาคประสงค์จะรับในวงเงินที่บริจาค",
      pinOption: "เงินบริจาคทุก 150 บาท สามารถรับเข็มเดี่ยวที่ระลึกได้ 1 อัน",
      shirtOption: "เงินบริจาคทุก 299 บาท สามารถรับเสื้อยืดที่ระลึกได้ 1 ตัว",
      shippingNote: "หมายเหตุ: จัดส่งฟรีไม่เสียค่าจัดส่งเพิ่มเติม",
      uploadProof: "แนบหลักฐานการโอนเงิน(สลิป)",
      saveInfo: "กดบันทึกข้อมูล",
      deliveryInfo: "ทางคณะแพทยศาสตร์ จุฬา จะดําเนินการส่งเข็มและเสื้อโดยทําการสรุปยอดทุกวันที่ 1 ของทุกเดือนเวลา 12:00 และจะทําการจัดส่ง ภายใน 3 สัปดาห์หลังจากสรุปยอด เวลาที่แจ้งเป็นแค่การประมาณ อาจล่าช้าตามการผลิต",
      registerDescription: "โครงการวันอานันทมหิดล คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย ประจำปี พ.ศ. ๒๕๖๗",
      fullName: "ชื่อ-นามสกุล",
      fullNameExample: "เช่น นายสมชาย ใจดี",
      phone: "เบอร์โทรศัพท์",
      phoneExample: "เช่น 081-901-xxxx",
      email: "อีเมล(ถ้ามี)",
      address: "ที่อยู่จัดส่ง",
      paymentMethod: "โปรดเลือกวิธีการชำระเงิน",
      qrPayment: "บริจาคผ่าน QR CODE",
      bankPayment: "บริจาคผ่านเลขที่บัญชี",
      next: "ต่อไป",
      forgotTrack: "ค้นหารหัสติดตาม",
      search: "ค้นหา",
      trackStatus: "ติดตามสถานะ",
      trackingCode: "รหัสติดตาม",
      forgotCode: "ลืมรหัส",
    },
    en: {
      home: "Home",
      register: "Register",
      track: "Track Status",
      switch: "TH",
      title: "Registration",
      eventTitle: "'Miles for Heart' Virtual Walk and Run is now open for registration",
      eventSubtitle: "Come walk or run for health with us today",
      socialMedia: "Facebook: ANAN DAY, Instagram: @anan_day, or on this website",
      registerRun: "MILES FOR HEART REGISTRATION",
      stepsTitle: "Steps to receive the commemorative pin or T-shirt for Ananda Mahidol Day",
      donationStep1: "Fill in the donation details",
      donationAmount: "Amount you wish to donate",
      donationItems: "Specify the number of shirts or pins you want to receive within your donation amount",
      pinOption: "Every 150 THB donation can receive 1 commemorative pin",
      shirtOption: "Every 299 THB donation can receive 1 commemorative T-shirt",
      shippingNote: "Note: Free shipping, no additional charges",
      uploadProof: "Upload proof of transfer (slip)",
      saveInfo: "Save information",
      deliveryInfo: "The Faculty of Medicine, Chulalongkorn University, will process and send out pins and T-shirts by summarizing orders on the 1st of each month at 12:00 PM. Items will be shipped within 3 weeks after the summary. The estimated time may be delayed depending on production.",
      registerDescription: "Ananda Mahidol Day Project, Faculty of Medicine, Chulalongkorn University, 2024",
      fullName: "Full Name",
      fullNameExample: "e.g. John Doe",
      phone: "Phone Number",
      phoneExample: "e.g. 081-901-xxxx",
      email: "Email (if any)",
      address: "Shipping Address",
      paymentMethod: "Please select a payment method",
      qrPayment: "Donate via QR CODE",
      bankPayment: "Donate via Bank Account",
      next: "Next",
      forgotTrack: "Find Tracking Code",
      search: "Search",
      trackStatus: "Track Status",
      trackingCode: "Tracking Code",
      forgotCode: "Forgot Code?",
    },
  };

  const toggleLanguage = (newLanguage: "th" | "en") => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
