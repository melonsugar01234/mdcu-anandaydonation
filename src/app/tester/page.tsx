"use client";

import { useState } from "react";
import SearchBar from "../components/Tracksearch";
import RegistrationGrid from "../components/RegistrationGrid";

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

export default function TesterPage() {
  const [registrations, setRegistrations] = useState<Register[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchTrackingCode: string) => {
    if (!searchTrackingCode.trim()) {
      setError("Please enter tracking code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/search?TrackingCode=${encodeURIComponent(searchTrackingCode)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }
      const data = await response.json();
      setRegistrations(data);
      if (data.length === 0) {
        setError("Not found");
      }
    } catch (err) {
      setError("Error searching");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ติดตามสถานะ</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <RegistrationGrid registrations={registrations} />
    </div>
  );
}
