'use client'
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "./tableTest/page";
import DemoPage from "./payment/page";
// import DemoPage from "../payment/page";
// import { dataTest } from ".testAdmin/dataTest";

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
  const buttonList = [
    { name: "ดาวน์โหลด .xlsx" },
    { name: "กรองสถานะ" },
    { name: "บริจาคเท่านั้น" },
    { name: "รับเสื้อ" },
    { name: "รับเข็ม" },
    { name: "รับเสื้อและเข็ม" },
    { name: "รับใบเสร็จ" },
    { name: "รับเสื้อและใบเสร็จ" },
    { name: "รับเข็มและใบเสร็จ" },
    { name: "รับเสื้อเข็มและใบเสร็จ" },
    { name: " กรองวันที่สร้าง" },
    { name: "ล้างตัวกรองทั้งหมด" },
    { name: "รีเฟรช" },
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
          {/* <DemoPage/> */}
          {/* <div>
            <div className="my-5">
              จำนวนคนบริจาคทั้งหมด : 518 <br />
              จำนวนคนที่บริจาคแต่ไม่ซื้อของ : 27
              <br />
              จำนวนคนที่บริจาคซื้อเสื้อ : 218 <br />
              จำนวนคนที่บริจาคซื้อเข็ม : 178 <br />
              จำนวนที่บริจาคซื้อเสื้อและเข็ม : 95 <br />
            </div>
            <div className="my-5">
              จำนวนเข็มเดี่ยวทั้งหมด : 491
              <br />
              จำนวนเข็มชุดทั้งหมด : <br />
            </div>
            <div className="my-5">
              จำนวนเสื้อสีแดงไซส์ XS ทั้งหมด : 11
              <br />
              จำนวนเสื้อสีแดงไซส์ S ทั้งหมด : 41 <br />
              จำนวนเสื้อสีแดงไซส์ M ทั้งหมด : 114 <br />
              จำนวนเสื้อสีแดงไซส์ L ทั้งหมด : 137 <br />
              จำนวนเสื้อสีแดงไซส์ XL ทั้งหมด : 76 <br />
              จำนวนเสื้อสีแดงไซส์ 2XL ทั้งหมด : 55 <br />
              จำนวนเสื้อสีแดงไซส์ 3XL ทั้งหมด : <br />
            </div>
            <div className="my-5">
              40 จำนวนเสื้อสีครีมไซส์ XS ทั้งหมด : 5 <br />
              จำนวนเสื้อสีครีมไซส์ S ทั้งหมด : <br />
              21 จำนวนเสื้อสีครีมไซส์ M ทั้งหมด : 52 <br />
              จำนวนเสื้อสีครีมไซส์ L ทั้งหมด : <br />
              57 จำนวนเสื้อสีครีมไซส์ XL ทั้งหมด : 53 <br />
              จำนวนเสื้อสีครีมไซส์ 2XL ทั้งหมด : 24 <br />
              จำนวนเสื้อสีครีมไซส์ 3XL ทั้งหมด : 19
              <br />
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}