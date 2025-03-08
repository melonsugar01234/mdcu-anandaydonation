// src/app/admin/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { Modal } from "./Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export interface Register {
  id: number;
  name: string;
  phone: string;
  email: string;
  home: string;
  tracking_code: string;
  created_at: Date;
  edited_at: Date;
  card: string | null;
  shirt: string | null;
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

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Register[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Register | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    paymentStatus: "",
    shipmentStatus: "",
    receipt: "",
    cardCount: "",
    shirt: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const queryParams = new URLSearchParams(filters as any).toString();
        const response = await fetch(`/api/admin?${queryParams}`);
        if (!response.ok) {
          console.error("Failed to fetch registrations:", response.statusText);
          return;
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchRegistrations();
  }, [filters]);

  const handleRowClick = (registration: Register) => {
    console.log("Row clicked:", registration);
    setSelectedRegistration(registration);
  };

  const handleModalClose = () => {
    setSelectedRegistration(null);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <Navbar />
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              setFilters({ ...filters, paymentStatus: e.target.value })
            }
          >
            <option value="">All Payment Status</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={filters.shipmentStatus}
            onChange={(e) =>
              setFilters({ ...filters, shipmentStatus: e.target.value })
            }
          >
            <option value="">All Shipment Status</option>
            <option value="on the way">On the way</option>
            <option value="encounter problem">Encounter problem</option>
            <option value="still in inventory">Still in inventory</option>
            <option value="no order">No order</option>
          </select>
          <select
            value={filters.receipt}
            onChange={(e) =>
              setFilters({ ...filters, receipt: e.target.value })
            }
          >
            <option value="">All Receipts</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <select
            value={filters.cardCount}
            onChange={(e) =>
              setFilters({ ...filters, cardCount: e.target.value })
            }
          >
            <option value="">All Card Counts</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select
            value={filters.shirt}
            onChange={(e) => setFilters({ ...filters, shirt: e.target.value })}
          >
            <option value="">All Shirts</option>
            <option value="not_null">Not Null</option>
            <option value="null">Null</option>
          </select>
        </div>
        <DataTable data={registrations} onRowClick={handleRowClick} />
        {selectedRegistration && (
          <Modal
            registration={selectedRegistration}
            onClose={handleModalClose}
          />
        )}
        <Footer />
      </div>
    );
  }

  return null;
}
