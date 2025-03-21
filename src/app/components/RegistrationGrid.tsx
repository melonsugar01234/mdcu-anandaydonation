"use client";

import RegistrationCard from "./RegistrationCard";

interface Register {
  id: number;
  name: string;
  tracking_code: string;
  shirts: string;
  card: string;
  shipment_status: string
  payment_amount: string
  payment_proof: string 
  payment_status: string
}

interface RegistrationGridProps {
  registrations: Register[];
}

export default function RegistrationGrid({
  registrations,
}: RegistrationGridProps) {
  return (
    <div className="grid grid-cols-1">
      {registrations.map((registration) => (
        <RegistrationCard key={registration.id} registration={registration} />
      ))}
    </div>
  );
}
