import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    {name:"ดาวน์โหลด .xlsx"},
    {name:"กรองสถานะ"},
    {name:"บริจาคเท่านั้น"},
    {name:"รับเสื้อ"},
    {name:"รับเข็ม"},
    {name:"รับเสื้อและเข็ม"},
    {name:"รับใบเสร็จ"},
    {name:"รับเสื้อและใบเสร็จ"},
    {name:"รับเข็มและใบเสร็จ"},
    {name:"รับเสื้อเข็มและใบเสร็จ"},
    {name:" กรองวันที่สร้าง"},
    {name:"ล้างตัวกรองทั้งหมด"},
    {name:"รีเฟรช"},
];
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <table>
          <thead>
            <tr>
              <th>เลขสถานะ</th>
              <th>คำอธิบาย</th>
            </tr>
          </thead>
          <tbody>
            {statusList.map((item) => (
              <tr>
                <td>{item.number}</td>
                <td>{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
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
            {/* {data.map(item => ( */}
            <tr>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
              <td>8</td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
        {buttonList.map((item)=>(
            <button>{item.name}</button>
        ))}
        <div>
          <div className="m-5">
            จำนวนคนบริจาคทั้งหมด : 518 <br />
            จำนวนคนที่บริจาคแต่ไม่ซื้อของ : 27
            <br />
            จำนวนคนที่บริจาคซื้อเสื้อ : 218 <br />
            จำนวนคนที่บริจาคซื้อเข็ม : 178 <br />
            จำนวนที่บริจาคซื้อเสื้อและเข็ม : 95 <br />
          </div>
          <div className="m-5">
            จำนวนเข็มเดี่ยวทั้งหมด : 491
            <br />
            จำนวนเข็มชุดทั้งหมด : <br />
          </div>
          <div className="m-5">
            จำนวนเสื้อสีแดงไซส์ XS ทั้งหมด : 11
            <br />
            จำนวนเสื้อสีแดงไซส์ S ทั้งหมด : 41 <br />
            จำนวนเสื้อสีแดงไซส์ M ทั้งหมด : 114 <br />
            จำนวนเสื้อสีแดงไซส์ L ทั้งหมด : 137 <br />
            จำนวนเสื้อสีแดงไซส์ XL ทั้งหมด : 76 <br />
            จำนวนเสื้อสีแดงไซส์ 2XL ทั้งหมด : 55 <br />
            จำนวนเสื้อสีแดงไซส์ 3XL ทั้งหมด : <br />
          </div>
          <div className="m-5">
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
      <Footer />
    </>
  );
}
