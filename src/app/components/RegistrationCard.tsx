"use client";
import { useLanguage } from "../context/LanguageContext";

interface RegistrationCardProps {
  registration: {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    home: string;
    tracking_code: string;
    created_at: Date;
    edited_at: Date;
    card: number | null;
    cardwithbox: number | null;
    shirts: string | null;
    shipment_status: string | null;
    payment_method: string | null;
    payment_amount: string | null;
    payment_proof: string | null;
    payment_status: string | null;
    receipt: string | null;
    national_id: string | null;
    name_on_receipt: string | null;
    address_on_receipt: string | null;
    item_tracking_number: string | null;
    receipt_tracking_number: string | null;
    error_details: string | null;
  };
}

export default function RegistrationCard({
  registration,
}: RegistrationCardProps) {
  const { language } = useLanguage();

  function getShipmentStatusText(status: string | null) {
    const statusMap: { [key: string]: string } = {
      "0": "กำลังตรวจสอบหลักฐานการโอนเงิน (Verifying Payment Proof)",
      "1": "กำลังจัดเตรียมเข็มฯ / เสื้อ (Preparing Pins / Shirts)",
      "2": "จัดส่งเข็มฯ / เสื้อ แล้ว (Shipped Pins / Shirts)",
      "3": "อยู่ระหว่างการออกใบเสร็จ (Processing Receipt)",
      "4": "จัดส่งใบเสร็จแล้ว (Receipt Shipped)",
      "5": "ไม่มีคำสั่งจัดซื้อ (No Order)",
      "99": "เกิดข้อผิดพลาด (Error)",
    };
    return status ? statusMap[status] || "Unknown" : "Pending";
  }

  // Function to format shirt data
  const formatShirtData = (shirtData: string) => {
    return shirtData
      .split(";")
      .map((shirt) => {
        const [size, color, amount] = shirt.split("-");
        return `Size: ${size.toUpperCase()} | Color: ${
          color.charAt(0).toUpperCase() + color.slice(1)
        } | Amount: ${amount}`;
      })
      .join("\n"); // Join with line breaks instead of commas
  };

  // Calculate total cost for shirts
  let totalShirtCount = 0;
  let shirtTotal = 0;
  if (registration.shirts) {
    registration.shirts.split(";").forEach((shirt) => {
      const [, , amount] = shirt.split("-");
      totalShirtCount += parseInt(amount) || 0;
    });
    shirtTotal = totalShirtCount * 350;
  }

  // Calculate total cost for commemorative pins
  const cardCount = registration.card
    ? parseInt(registration.card.toString()) || 0
    : 0;
  const cardTotal = cardCount * 150;


  const cardwithboxCount = registration.cardwithbox
    ? parseInt(registration.cardwithbox.toString()) || 0
    : 0;
  const cardwithboxTotal = cardwithboxCount * 250;

  const totalAmount =
    parseFloat(registration.payment_amount || "0") +
    shirtTotal +
    cardTotal +
    cardwithboxTotal;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl w-full text-center border border-gray-200">
          <h3 className="text-xl font-semibold text-center mb-4">
            {language === "en" ? "Tracking Status" : "ติดตามสถานะ"}
          </h3>
          <div className="border p-4 rounded-lg bg-gray-100 text-center">
            <p>
              <strong>
                {language === "en" ? "Payment Status" : "สถานะการชำระเงิน"}:
              </strong>{" "}
              <span
                className={`badge ${
                  registration.payment_status === "Pending"
                    ? "badge-neutral"
                    : registration.payment_status === "Approved"
                    ? "badge-success"
                    : registration.payment_status === "Rejected"
                    ? "badge-error"
                    : ""
                }`}
              >
                {registration.payment_status === "Pending"
                  ? language === "en"
                    ? "Pending"
                    : "รอดำเนินการ"
                  : registration.payment_status === "Approved"
                  ? language === "en"
                    ? "Approved"
                    : "อนุมัติ"
                  : registration.payment_status === "Rejected"
                  ? language === "en"
                    ? "Rejected"
                    : "ปฏิเสธ"
                  : language === "en"
                  ? "Unknown"
                  : "ไม่ทราบสถานะ"}
              </span>
            </p>
            <p>
              <strong>
                {language === "en" ? "Shipment Status" : "สถานะจัดส่ง"}:
              </strong>{" "}
              {registration.shipment_status === "99" ? (
                <span className="badge badge-error">
                  {language === "en"
                    ? "เกิดข้อผิดพลาด (Error)"
                    : "เกิดข้อผิดพลาด (Error)"}
                </span>
              ) : (
                getShipmentStatusText(registration.shipment_status)
              )}
            </p>
            {registration.shipment_status === "2" && registration.item_tracking_number && (
              <div className="mb-2">
                <span className="font-semibold">
                  {language === "en" ? "Parcel Tracking Number:" : "เลขพัสดุ:"}
                </span>{" "}
                <span className="badge badge-outline badge-info">
                  {registration.item_tracking_number}
                </span>
              </div>
            )}
            {registration.shipment_status === "4" && registration.receipt_tracking_number && (
              <div className="mb-2">
              <span className="font-semibold">
                {language === "en" ? "Receipt Parcel Tracking Number:" : "เลขพัสดุใบเสร็จ:"}
              </span>{" "}
              <span className="badge badge-outline badge-info">
                {registration.receipt_tracking_number}
              </span>
              </div>
            )}
           {registration.shipment_status === "99" && (
  <div className="mb-2">
    {registration.error_details && (
      <div className="mb-2">
        <span className="font-semibold">
          {language === "en" ? "Error Details:" : "รายละเอียดข้อผิดพลาด:"}
        </span>{" "}
        <span className="badge badge-outline badge-error">
          {registration.error_details}
        </span>
      </div>
    )}
    <p className="text-red-600 mt-2">
      {language === "en"
        ? "Please re-register or contact support via LINE ID: prmdcu or ANANDAY's Facebook page."
        : "กรุณาลงทะเบียนใหม่หรือติดต่อเจ้าหน้าที่ผ่าน LINE ID: prmdcu หรือ แฟนเพจ ANANDAY"}
    </p>
  </div>
)}
          </div>

          {/* Personal Information */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">
              {language === "en" ? "Personal Information" : "ข้อมูลส่วนตัว"}
            </h3>
            <p>
              <strong>{language === "en" ? "Name" : "ชื่อ-นามสกุล"}:</strong>{" "}
              {registration.name}
            </p>
            <p>
              <strong>{language === "en" ? "Phone" : "โทรศัพท์"}:</strong>{" "}
              {registration.phone}
            </p>
            <p>
              <strong>{language === "en" ? "Email" : "อีเมล"}:</strong>{" "}
              {registration.email || "-"}
            </p>
            <p>
              <strong>
                {language === "en" ? "Shipping Address" : "ที่อยู่จัดส่ง"}:
              </strong>{" "}
              {registration.home}
            </p>
          </div>

          {/* Donation Information */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">
              {language === "en" ? "Donation Information" : "ข้อมูลบริจาค"}
            </h3>
            <p>
              <strong>
                {language === "en" ? "Donation Amount" : "จำนวนเงินที่บริจาค"}:
              </strong>{" "}
              {registration.payment_amount} {language === "en" ? "THB" : "บาท"}
            </p>
            <p>
              <strong>
                {language === "en" ? "Receipt Request" : "ต้องการรับใบเสร็จ"}:
              </strong>{" "}
              {registration.receipt === "yes" ? "✅" : "❌"}
            </p>
          </div>

          {/* Order Details Table */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold">
              {language === "en" ? "Donation Details" : "รายละเอียดการบริจาค"}
            </h3>
            <table className="w-full mt-2 border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">
                    {language === "en" ? "Item" : "รายการ"}
                  </th>
                  <th className="border p-2">
                    {language === "en" ? "Quantity" : "จำนวน"}
                  </th>
                  <th className="border p-2">
                    {language === "en" ? "Price (THB)" : "ราคา (บาท)"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">
                    {language === "en"
                      ? "Donation Amount"
                      : "จำนวนเงินที่บริจาค"}
                  </td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">{registration.payment_amount}</td>
                </tr>

                {cardCount !== 0 && cardCount !== undefined && (
                  <tr>
                    <td className="border p-2">
                      {language === "en" ? "Commemorative Pin" : "เข็มที่ระลึก"}
                    </td>
                    <td className="border p-2">{cardCount}</td>
                    <td className="border p-2">{cardTotal}</td>
                  </tr>
                )}
                {cardwithboxCount !== 0 && cardwithboxCount !== undefined && (
                  <tr>
                    <td className="border p-2">
                      {language === "en"
                        ? "Pin with box"
                        : "เข็มที่ระลึกพร้อมกล่อง"}
                    </td>
                    <td className="border p-2">{cardwithboxCount}</td>
                    <td className="border p-2">{cardwithboxTotal}</td>
                  </tr>
                )}
                {totalShirtCount !== 0 && totalShirtCount !== undefined && (
                  <tr>
                    <td className="border p-2">
                      {language === "en" ? "Shirt" : "เสื้อที่ระลึก"}
                    </td>
                    <td className="border p-2">{totalShirtCount}</td>
                    <td className="border p-2">{shirtTotal}</td>
                  </tr>
                )}

                <tr className="font-bold bg-gray-100">
                  <td className="border p-2">
                    {language === "en" ? "Total" : "รวม"}
                  </td>
                  <td className="border p-2">-</td>
                  <td className="border p-2">{registration.payment_amount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Shirt Details */}
          {registration.shirts && (
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold">
                {language === "en" ? "Shirt Details" : "รายละเอียดเสื้อ"}
              </h3>
              <pre className="text-gray-700 whitespace-pre-wrap">
                {formatShirtData(registration.shirts)}
              </pre>
            </div>
          )}

          {/* Payment Proof Image */}
          {registration.payment_proof && (
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold">
                {language === "en" ? "Payment Proof" : "หลักฐานการชำระเงิน"}
              </h3>
              <figure className="mt-2">
                <img
                  src={registration.payment_proof}
                  alt="Payment Proof"
                  className="rounded-lg max-w-full"
                />
              </figure>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
