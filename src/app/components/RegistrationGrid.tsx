"use client";

import RegistrationCard from "./RegistrationCard";
interface RegistrationGridProps {
  registrations: any[];
}

export function RegistrationGrid({ registrations }: RegistrationGridProps) {
  return (
    <div className="grid grid-cols-1">
      {registrations.map((registration: any) => (
        <RegistrationCard key={registration.id} registration={registration} />
      ))}
    </div>
  );
}
