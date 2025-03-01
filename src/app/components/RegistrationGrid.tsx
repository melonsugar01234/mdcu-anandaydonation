"use client";

import RegistrationCard from "./RegistrationCard";

interface Register {
  id: number;
  name: string;
  tracking_code: string;
  shirt: string;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {registrations.map((registration) => (
        <RegistrationCard key={registration.id} registration={registration} />
      ))}
    </div>
  );
}
