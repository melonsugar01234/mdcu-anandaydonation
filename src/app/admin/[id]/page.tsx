"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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

function formatDate(timestamp: string) {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  return (
    date.toISOString().slice(0, 10) +
    " @" +
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function AdminApprovePaymentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [register, setRegister] = useState<Register | null>(null);
  const [loading, setLoading] = useState(true);
  const [shipmentStatus, setShipmentStatus] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/register/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setRegister(data);
          setShipmentStatus(data.shipment_status || "");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching registration data:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shipment_status: shipmentStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update status: ${response.status} - ${errorText}`
        );
      }

      const updatedRegister = await response.json();
      setRegister(updatedRegister);
      alert("Shipment status updated successfully!");
    } catch (error) {
      console.error("Error updating shipment status:", error);
      alert("Failed to update shipment status.");
    }
  };

  const handleApprovePayment = async () => {
    try {
      const response = await fetch(`/api/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_status: "Approved" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to approve payment: ${response.status} - ${errorText}`);
      }

      const updatedRegister = await response.json();
      setRegister(updatedRegister);
      alert("Payment proof approved successfully!");
    } catch (error) {
      console.error("Error approving payment proof:", error);
      alert("Failed to approve payment proof.");
    }
  };

  const handleRejectPayment = async () => {
    try {
      const response = await fetch(`/api/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_status: "Rejected" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to reject payment: ${response.status} - ${errorText}`);
      }

      const updatedRegister = await response.json();
      setRegister(updatedRegister);
      alert("Payment proof rejected successfully!");
    } catch (error) {
      console.error("Error rejecting payment proof:", error);
      alert("Failed to reject payment proof.");
    }
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

        <h1 className="text-2xl font-bold text-center mb-6">User Information</h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-4">
            <p><strong>ID:</strong> {register.id}</p>
            <p><strong>Name:</strong> {register.name}</p>
            <p><strong>Phone:</strong> {register.phone}</p>
            <p><strong>Email:</strong> {register.email}</p>
            <p><strong>Home Address:</strong> {register.home}</p>
            <p><strong>Tracking Code:</strong> {register.tracking_code}</p>
            <p><strong>Created At:</strong> {formatDate(register.created_at)}</p>
            <p><strong>Edited At:</strong> {formatDate(register.edited_at)}</p>
            <p><strong>Shirts:</strong> {register.shirts}</p>
            <p><strong>Shipment Status:</strong> {register.shipment_status}</p>
            <p><strong>Payment Method:</strong> {register.payment_method}</p>
            <p><strong>Payment Amount:</strong> {register.payment_amount}</p>

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

            <p><strong>Payment Status:</strong> {register.payment_status}</p>
            <p><strong>Receipt:</strong> {register.receipt}</p>
            <p><strong>National ID:</strong> {register.national_id}</p>
            <p><strong>Name on Receipt:</strong> {register.name_on_receipt}</p>
            <p><strong>Address on Receipt:</strong> {register.address_on_receipt}</p>

            <form onSubmit={handleStatusChange} className="mt-4">
              <label className="block mb-2 font-bold">Update Shipment Status:</label>
              <div className="space-y-2">
                {[
                  { value: "0", label: "0 กำลังตรวจสอบ (Pending / Verifying)" },
                  { value: "1", label: "1 กำลังเตรียมของ (Preparing)" },
                  { value: "2", label: "2 จัดส่งแล้ว (Shipped)" },
                  { value: "3", label: "3 จัดส่งสำเร็จ (Delivered)" },
                  { value: "4", label: "4 ไม่มีคำสั่งซื้อ (No order)" },
                  { value: "99", label: "99 เกิดข้อผิดพลาด (Error)" },
                ].map((status) => (
                  <label key={status.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="shipment_status"
                      value={status.value}
                      checked={shipmentStatus === status.value}
                      onChange={(e) => setShipmentStatus(e.target.value)}
                      className="form-radio"
                    />
                    <span>{status.label}</span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Update Shipment Status
              </button>
            </form>

            <div className="mt-6 space-x-4">
              <button
                onClick={handleApprovePayment}
                className="w-full sm:w-auto p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve Payment Proof
              </button>

              <button
                onClick={handleRejectPayment}
                className="w-full sm:w-auto p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reject Payment Proof
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
