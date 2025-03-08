'use client'
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "./tableOrder/page";

export default function testAdmin() {
  const statusList = [
    { number: "0", detail: "กำลังตรวจสอบหลักฐานการโอนเงิน" },
    { number: "1", detail: "กำลังจัดเตรียมเข็มฯ / เสื้อ" },
    { number: "2", detail: "จัดส่งเข็มฯ / เสื้อ แล้ว" },
    { number: "3", detail: "อยู่ระหว่างการออกใบเสร็จ" },
    { number: "4", detail: "จัดส่งใบเสร็จแล้ว" },
    { number: "5", detail: "ทดสอบ" },
    { number: "99", detail: "มีปัญหา" },
  ];
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-[640px] mx-auto p-5">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base text-black">
                  <th>เลขสถานะ</th>
                  <th>คำอธิบาย</th>
                </tr>
              </thead>
              <tbody>
                {statusList.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.number}</td>
                    <td>{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Table/>
        </div>
      </div>
      <Footer />
    </>
  );
}