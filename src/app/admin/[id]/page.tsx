"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Register {
  id: number;
  name: string;
  phone: string;
  email: string;
  home: string;
  tracking_code: string;
  created_at: string;
  edited_at: string;
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
  item_tracking_number?: string | null;
  receipt_tracking_number?: string | null;
  error_details?: string | null;
  alumni?: string | null;
  alumni_gen?: string | null;
}

export default function AdminApprovePaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [register, setRegister] = useState<Register | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isAlumni, setIsAlumni] = useState<boolean>(false);
  const [alumniGen, setAlumniGen] = useState<string>("");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (register) {
      setIsAlumni(register.alumni === "true");
      setAlumniGen(register.alumni_gen || "");
    }
  }, [register]);

  useEffect(() => {
    if (status !== "authenticated" || !id) return;
    fetchRegisterData();
  }, [status, id]);

  const fetchRegisterData = async () => {
    try {
      const res = await fetch(`/api/register/${id}`);
      if (!res.ok) throw new Error("Failed to fetch registration data");
      const data = await res.json();
      setRegister(data);
      setShipmentStatus(data.shipment_status || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRegister = async (updateData: Partial<Register>) => {
    try {
      const res = await fetch(`/api/register/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update: ${res.status} - ${errorText}`);
      }
      const updatedRegister = await res.json();
      setRegister(updatedRegister);
      alert("Update successful!");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  };

  const handleAlumniUpdate = async () => {
    await updateRegister({
      alumni: isAlumni ? "true" : "",
      alumni_gen: isAlumni ? alumniGen : "",
    });
  };

  const handleStatusChange = (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: Partial<Register> = {
      shipment_status: shipmentStatus,
    };

    if (shipmentStatus === "2") {
      updateData.item_tracking_number = trackingNumber;
      updateData.receipt_tracking_number = null;
      updateData.error_details = null;
    } else if (shipmentStatus === "4") {
      updateData.receipt_tracking_number = trackingNumber;
      updateData.item_tracking_number = null;
      updateData.error_details = null;
    } else if (shipmentStatus === "99") {
      updateData.error_details = additionalDetails;
      updateData.item_tracking_number = null;
      updateData.receipt_tracking_number = null;
    } else {
      updateData.item_tracking_number = null;
      updateData.receipt_tracking_number = null;
      updateData.error_details = null;
    }

    updateRegister(updateData);
  };

  const handleApprovePayment = () =>
    updateRegister({ payment_status: "Approved" });
  const handleRejectPayment = () =>
    updateRegister({ payment_status: "Rejected" });

  const handleDeleteRegistration = async () => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const res = await fetch(`/api/register/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete: ${res.status} - ${errorText}`);
      }

      alert("Registration deleted successfully!");
      router.push("/admin"); // Redirect to the admin page after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete registration.");
    }
  };

  const getShipmentStatusText = (status: string | null) => {
    const statusText = {
      "0": "0 กำลังตรวจสอบ (Pending / Verifying)",
      "1": "1 กำลังเตรียมของ (Preparing)",
      "2": "2 จัดส่งเข็มฯ / เสื้อเเล้ว (Shipped)",
      "3": "3 อยู่ระหว่างออกใบเสร็จ (Processing Receipt)",
      "4": "4 จัดส่งใบเสร็จแล้ว (Receipt Shipped)",
      "5": "5 ไม่มีคำสั่งซื้อ (No order)",
      "99": "99 เกิดข้อผิดพลาด (Error)",
    };
    return status
      ? statusText[status as keyof typeof statusText] || "Unknown"
      : "Pending";
  };

  if (loading) return <div>Loading...</div>;
  if (!register) return <div>No registration found.</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-6">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          ← ย้อนกลับ
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          ข้อมูลการลงทะเบียน
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>รหัส:</strong> {register.id}
          </p>
          <p>
            <strong>ชื่อ:</strong> {register.name}
          </p>
          <p>
            <strong>เบอร์โทร:</strong> {register.phone}
          </p>
          <p>
            <strong>อีเมล:</strong> {register.email}
          </p>
          <p>
            <strong>ที่อยู่:</strong> {register.home}
          </p>
          <p>
            <strong>รหัสติดตาม:</strong> {register.tracking_code}
          </p>
          {/* Show alumni status and generation */}
          <p>
            <strong>ศิษย์เก่าแพทย์จุฬาฯ:</strong>{" "}
            {register.alumni ? "✅" : "❌"}
          </p>
          {register.alumni && (
            <p>
              <strong>รุ่นศิษย์เก่า:</strong> {register.alumni_gen || "ไม่ระบุ"}
            </p>
          )}
          {/* Editable alumni section */}
            <div className="flex flex-col space-y-2 mb-4 mt-4">
              <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={isAlumni}
                onChange={() => setIsAlumni(!isAlumni)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-lg">เป็นศิษย์เก่าแพทย์จุฬาฯ</span>
              </label>
              {isAlumni && (
                <select
                className="select select-bordered ml-4"
                value={alumniGen}
                onChange={(e) => setAlumniGen(e.target.value)}
                >
                <option value="">เลือกรุ่นศิษย์เก่า</option>
                {Array.from({ length: 75 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                  รุ่น {i + 1}
                  </option>
                ))}
                </select>
              )}
              <button
                className="btn btn-info ml-2"
                onClick={handleAlumniUpdate}
                disabled={isAlumni && !alumniGen}
                type="button"
              >
                บันทึกข้อมูลศิษย์เก่า
              </button>
              </div>
              {isAlumni && (
              <p className="text-sm text-gray-600">
                ระบบจะแสดงยอดบริจาคบนหน้าแรกของเว็บไซต์หลังจากใบเสร็จได้รับการอนุมัติแล้ว
              </p>
              )}
            </div>
        </div>

        

        <h2 className="text-xl font-bold mt-6">ข้อมูลคำสั่งซื้อ</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>เข็มที่ระลึก:</strong> {register.card}
          </p>
          <p>
            <strong>เข็มที่ระลึกพร้อมกล่อง:</strong> {register.cardwithbox}
          </p>
          <p>
            <strong>เสื้อที่ระลึก:</strong> {register.shirts}
          </p>
          <p>
            <strong>วิธีการชำระเงิน:</strong> {register.payment_method}
          </p>
          <p>
            <strong>จำนวนเงินที่ชำระ:</strong> {register.payment_amount} บาท
          </p>
          {register.payment_proof && (
            <div>
              <figure className="mb-4">
                <img
                  src={`${register.payment_proof}`}
                  alt="หลักฐานการชำระเงิน"
                  className="rounded-lg max-w-sm"
                />
              </figure>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mt-6">ใบเสร็จ</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>รับใบเสร็จ:</strong>{" "}
            {register.receipt === "yes" ? "✅" : "❌"}
          </p>
          <p>
            <strong>เลขบัตรประชาชน:</strong> {register.national_id}
          </p>
          <p>
            <strong>ชื่อในใบเสร็จ:</strong> {register.name_on_receipt}
          </p>
          <p>
            <strong>ที่อยู่ในใบเสร็จ:</strong> {register.address_on_receipt}
          </p>
        </div>

        <h2 className="text-xl font-bold mt-6">สถานะ</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* สถานะการจัดส่ง */}
          <div>
            <p className="font-semibold text-lg">สถานะการจัดส่ง:</p>
            <p className="mb-4">
              {getShipmentStatusText(register.shipment_status)}
            </p>
            <form onSubmit={handleStatusChange} className="space-y-4">
              <label className="block font-bold">อัปเดตสถานะการจัดส่ง:</label>
              <div className="space-y-2">
                {[
                  { value: "0", label: "0 กำลังตรวจสอบ (Pending / Verifying)" },
                  { value: "1", label: "1 กำลังเตรียมของ (Preparing)" },
                  { value: "2", label: "2 จัดส่งเข็มฯ / เสื้อเเล้ว (Shipped)" },
                  {
                    value: "3",
                    label: "3 อยู่ระหว่างออกใบเสร็จ (Processing Receipt)",
                  },
                  {
                    value: "4",
                    label: "4 จัดส่งใบเสร็จแล้ว (Receipt Shipped)",
                  },
                  { value: "5", label: "5 ไม่มีคำสั่งซื้อ (No order)" },
                  { value: "99", label: "99 เกิดข้อผิดพลาด (Error)" },
                ].map((status) => (
                  <label
                    key={status.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="shipment_status"
                      value={status.value}
                      checked={shipmentStatus === status.value}
                      onChange={(e) => setShipmentStatus(e.target.value)}
                      className="form-radio text-blue-500"
                    />
                    <span>
                      {status.label}
                      {status.value === "2" && register?.item_tracking_number && (
                      <span className="badge badge-outline badge-info ml-2">
                        เลขพัสดุ: {register.item_tracking_number}
                      </span>
                      )}
                      {status.value === "4" && register?.receipt_tracking_number && (
                      <span className="badge badge-outline badge-info ml-2">
                        เลขพัสดุใบเสร็จ: {register.receipt_tracking_number}
                      </span>
                      )}
                      {status.value === "99" && register?.error_details && (
                      <span className="badge badge-outline badge-info ml-2">
                        รายละเอียด: {register.error_details}
                      </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>

              {(shipmentStatus === "2" || shipmentStatus === "4") && (
                <div>
                  <label className="block font-bold mt-2">
                    เลขพัสดุ (Tracking Number):
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    name="tracking_number"
                    placeholder="กรอกเลขพัสดุ"
                  />
                </div>
              )}

              {shipmentStatus === "99" && (
                <div>
                  <label className="block font-bold mt-2">
                    รายละเอียดเพิ่มเติม (Additional Details):
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    name="additional_details"
                    placeholder="กรอกรายละเอียดเพิ่มเติม"
                  />
                </div>
              )}

              <button type="submit" className="btn btn-info">
                อัปเดตสถานะการจัดส่ง
              </button>
            </form>
          </div>

          {/* Payment Status */}
          <div>
            <p className="font-semibold text-lg">สถานะการชำระเงิน:</p>
            <p className="mb-4">
              {register.payment_status === "Pending"
                ? "รอดำเนินการ"
                : register.payment_status === "Approved"
                ? "อนุมัติ"
                : register.payment_status === "Rejected"
                ? "ปฏิเสธ"
                : "ไม่ทราบสถานะ"}{" "}
              {/* Default fallback */}
            </p>
          </div>

          {/* ปุ่มดำเนินการ */}
          <div className="flex flex-col space-y-6">
            {/* ส่วนอนุมัติ / ปฏิเสธ */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <button
                onClick={handleApprovePayment}
                className="btn btn-success"
              >
                อนุมัติหลักฐานการชำระเงิน
              </button>
              <button onClick={handleRejectPayment} className="btn btn-error">
                ปฏิเสธหลักฐานการชำระเงิน
              </button>
            </div>

            {/* ลบการลงทะเบียน */}
            <div className="border border-red-300 rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={handleDeleteRegistration}
                  className="btn btn-warning"
                >
                  ลบการลงทะเบียน
                </button>
                <span className="text-sm text-red-700 font-medium">
                  👿😡 คำเตือน: การลบไม่สามารถยกเลิกกลับได้!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
