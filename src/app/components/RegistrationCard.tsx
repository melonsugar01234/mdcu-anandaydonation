"use client";
import { useLanguage } from "../context/LanguageContext"; // Adjust the path as necessary

interface Register {
  id: number;
  name: string;
  tracking_code: string;
  shirts: string;
  card: string;
  shipment_status: string;
  payment_amount: string;
  payment_proof: string;
  payment_status: string;
}

interface RegistrationCardProps {
  registration: Register;
}

export default function RegistrationCard({
  registration,
}: RegistrationCardProps) {
  const { language } = useLanguage(); // Get the language from context

  // Function to format shirt data
  const formatShirtData = (shirtData: string) => {
    return shirtData
      .split(";")
      .map((shirt) => {
        const [size, color, amount] = shirt.split("-");
        return `Size: ${size} Color: ${
          color.charAt(0).toUpperCase() + color.slice(1)
        } Amount: ${amount}`;
      })
      .join(" , "); // Join with a comma and space
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        {/* {registration.payment_proof && (
          <figure className="mb-4">
            <img
              src={registration.payment_proof}
              alt={`Payment proof`}
              className="rounded-lg max-w-sm"
            />
          </figure>
        )} */}

        <h2 className="card-title">{registration.name}</h2>

        <div
          className={`space-y-4 w-full max-w-md ${
            language === "en" ? "" : "hidden"
          } `}
        >
          <div>
            <h3 className="underline font-bold text-lg">
              Tracking Information
            </h3>
            <p>Name: {registration.name}</p>
            <p>Tracking Code: {registration.tracking_code}</p>
            <p>
              Shipment Status: {registration.shipment_status || "Not shipped"}
            </p>
          </div>

          <div>
            <h3 className="underline font-bold text-lg">Order Details</h3>
            <p>
              Shirts:{" "}
              {registration.shirts
                ? formatShirtData(registration.shirts)
                : "Not selected"}
            </p>
            <p>Card: {registration.card || "Not selected"}</p>
          </div>

          <div>
            <h3 className="underline font-bold text-lg">
              Donation Information
            </h3>
            <p>
              Amount: {`${registration.payment_amount} บาท` || "Not specified"}
            </p>
            <p>Status: {registration.payment_status || "Pending"}</p>
          </div>

          {/* ID */}
          <div className="text-xs text-gray-500">ID: {registration.id}</div>
        </div>
        <div
          className={`space-y-4 w-full max-w-md ${
            language === "th" ? "" : "hidden"
          } `}
        >
          <div>
            <h3 className="underline font-bold text-lg">ข้อมูลการจัดส่ง</h3>
            <p>ชื่อ: {registration.name}</p>
            <p>รหัสติดตาม: {registration.tracking_code}</p>
            <p>สถานะจัดส่ง: {registration.shipment_status || "Not shipped"}</p>
          </div>

          <div>
            <h3 className="underline font-bold text-lg">
              รายละเอียดคำสั่งซื้อ
            </h3>
            <p>
              เสื้อที่สั่ง:{" "}
              {registration.shirts
                ? formatShirtData(registration.shirts)
                : "Not selected"}
            </p>
            <p>เข็มที่ระลึก: {`${registration.card} เข็ม` || "Not selected"}</p>
          </div>

          <div>
            <h3 className="underline font-bold text-lg">ข้อมูลบริจาค</h3>
            <p>
              จำนวน: {`${registration.payment_amount} บาท` || "Not specified"}
            </p>
            <p>สถานะ: {registration.payment_status || "Pending"}</p>
          </div>

          {/* ID */}
          <div className="text-xs text-gray-500">ID: {registration.id}</div>
        </div>
      </div>
    </div>
  );
}
