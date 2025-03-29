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
}

export default function AdminApprovePaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [register, setRegister] = useState<Register | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipmentStatus, setShipmentStatus] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

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

  const handleStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    updateRegister({ shipment_status: shipmentStatus });
  };

  const handleApprovePayment = () =>
    updateRegister({ payment_status: "Approved" });
  const handleRejectPayment = () =>
    updateRegister({ payment_status: "Rejected" });

  const getShipmentStatusText = (status: string | null) => {
    const statusText = {
      "0": "0 (Verifying Payment)",
      "1": "1 (Preparing)",
      "2": "2 (Shipped)",
      "3": "3 (Processing Receipt)",
      "4": "4 (Receipt Shipped)",
      "99": "99 (Error)",
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
          ← Go Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          Registration Info
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>ID:</strong> {register.id}
          </p>
          <p>
            <strong>Name:</strong> {register.name}
          </p>
          <p>
            <strong>Phone:</strong> {register.phone}
          </p>
          <p>
            <strong>Email:</strong> {register.email}
          </p>
          <p>
            <strong>Address:</strong> {register.home}
          </p>
          <p>
            <strong>Tracking Code:</strong> {register.tracking_code}
          </p>
        </div>

        <h2 className="text-xl font-bold mt-6">Orders Info</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>Pins:</strong> {register.card}
          </p>
          <p>
            <strong>Shirts:</strong> {register.shirts}
          </p>
          <p>
            <strong>Payment Method:</strong> {register.payment_method}
          </p>
          <p>
            <strong>Payment Amount:</strong> {register.payment_amount} บาท
          </p>
          {register.payment_proof && (
            <div>
              <figure className="mb-4">
                <img
                  src={register.payment_proof}
                  alt="Payment proof"
                  className="rounded-lg max-w-sm"
                />
              </figure>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mt-6">Receipt</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p>
            <strong>Receipt:</strong> {register.receipt}
          </p>
          <p>
            <strong>National ID:</strong> {register.national_id}
          </p>
          <p>
            <strong>Name on Receipt:</strong> {register.name_on_receipt}
          </p>
          <p>
            <strong>Address on Receipt:</strong> {register.address_on_receipt}
          </p>
        </div>

        <h2 className="text-xl font-bold mt-6">Status</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* Shipment Status */}
          <div>
            <p className="font-semibold text-lg">Shipment Status:</p>
            <p className="mb-4">
              {getShipmentStatusText(register.shipment_status)}
            </p>
            <form onSubmit={handleStatusChange} className="space-y-4">
              <label className="block font-bold">Update Shipment Status:</label>
              <div className="space-y-2">
                {[
                  { value: "0", label: "0 กำลังตรวจสอบ (Pending / Verifying)" },
                  { value: "1", label: "1 กำลังเตรียมของ (Preparing)" },
                  { value: "2", label: "2 จัดส่งเข็มฯ / เสื้อเเล้ว (Shipped)" },
                  { value: "3", label: "3 อยู่ระหว่างออกใบเสร็จ (Processing Receipt)" },
                  { value: "4", label: "5 จัดส่งใบเสร็จแล้ว (Receipt Shipped)"},
                  { value: "5", label: "4 ไม่มีคำสั่งซื้อ (No order)" },
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
                    <span>{status.label}</span>
                  </label>
                ))}
              </div>
              <button type="submit" className="btn btn-info">
                Update Shipment Status
              </button>
            </form>
          </div>

          {/* Payment Status */}
          <div>
            <p className="font-semibold text-lg">Payment Status:</p>
            <p className="mb-4">{register.payment_status}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <button onClick={handleApprovePayment} className="btn btn-success">
              Approve Payment Proof
            </button>
            <button onClick={handleRejectPayment} className="btn btn-warning">
              Reject Payment Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
