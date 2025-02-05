import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DemoPage from "../payment/page";
// import { dataTest } from ".testAdmin/dataTest";

export default function testAdmin() {
  const statusList = [
    { number: "0", detail: "กำลังตรวจสอบหลักฐานการโอนเงิน" },
    { number: "1", detail: "กำลังจัดเตรียมเข็มฯ / เสื้อ" },
    { number: "2", detail: "จัดส่งเข็มฯ / เสื้อ แล้ว" },
    { number: "3", detail: "อยู่ระหว่างการออกใบเสร็จ" },
    { number: "4", detail: "จัดส่งใบเสร็จแล้ว" },
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
          <DemoPage />
          {/* <div className="max-h-[500px] overflow-auto">
            <table className="table-auto table-xs table-pin-rows table-pin-cols border-collapse whitespace-nowrap">
              <thead>
                <tr className="text-base text-black sticky top-0 bg-white">
                  <th>วันที่สร้าง</th>
                  <th>วันที่อัพเดต</th>
                  <th>รหัสติดตาม</th>
                  <th>สถานะ</th>
                  <th>ชื่อ-สกุล</th>
                  <th>โทรศัพท์</th>
                  <th>อีเมล</th>
                  <th>ที่อยู่</th>
                  <th>บริจาคเงินหรือไม่</th>
                  <th>จำนวนเงินที่บริจาค</th>
                  <th>จำนวนเข็มเดี่ยวที่ขอ</th>
                  <th>จำนวนเข็มชุดที่ขอ</th>
                  <th>ขอใบเสร็จหรือไม่</th>
                  <th>เลขประจำตัวประชาชน</th>
                  <th>ชื่อบนใบเสร็จ</th>
                  <th>ที่อยู่ออกใบเสร็จ</th>
                  <th>ซื่้อเสื้อหรือไม่</th>
                  <th>ออร์เดอร์เสื้อ</th>
                  <th>เวลาที่โอนเงิน</th>
                  <th>วันที่โอนเงิน</th>
                  <th>เลขไปรษณีย์ 1</th>
                  <th>เลขไปรษณีย์ 2</th>
                </tr>
              </thead>
              <tbody>
                {dataTest.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.id}</td>
                    <td>{item.status}</td>
                    <td>{item.name}</td>
                    <td>{item.telephone}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.donate}</td>
                    <td>{item.donateAmount}</td>
                    <td>{item.singlePinAmount}</td>
                    <td>{item.pinSetAmount}</td>
                    <td>{item.receipt}</td>
                    <td>{item.nationalId}</td>
                    <td>{item.receiptName}</td>
                    <td>{item.receiptAddress}</td>
                    <td>{item.buyShirt}</td>
                    <td>{item.order}</td>
                    <td>{item.transferTime}</td>
                    <td>{item.trnasferDate}</td>
                    <td>{item.trackingNumber1}</td>
                    <td>{item.trackingNumber2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          {/* <div className="my-2">
            {buttonList.map((item, itemIndex) => (
              <button key={itemIndex} className="btn btn-outline btn-sm">
                {item.name}
              </button>
            ))}
          </div> */}
          <div>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
