"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StatisticalData from "../components/StatisticalData";
import AdminStatsTable from "../components/AdminStatsTable";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [donationStatus, setDonationStatus] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/statistic");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        setError("Error fetching statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDonationStatus = async () => {
      try {
        const response = await fetch("/api/donation-status");
        if (!response.ok) {
          throw new Error("Failed to fetch donation status");
        }
        const data = await response.json();
        console.log("Donation Status Data:", data);
        setDonationStatus(data?.isOpen ?? true);
      } catch (err) {
        console.error(err);
      }
    };

    if (status === "authenticated") {
      fetchStatistics();
      fetchDonationStatus();
    }
  }, [status]);

  const toggleDonationStatus = async () => {
    const confirmChange = window.confirm(
      `Are you sure you want to ${donationStatus ? "close" : "open"} donations?`
    );
    if (!confirmChange) return;

    try {
      const response = await fetch("/api/donation-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isOpen: !donationStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update donation status");
      }

      const data = await response.json();
      setDonationStatus(data.isOpen);
      alert(
        `Donations have been ${data.isOpen ? "opened" : "closed"} successfully!`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update donation status.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>
        <div className="navbar bg-secondary text-white shadow-sm mb-3">
          <a className="btn btn-ghost text-xl">Admin UI</a>
        </div>
      </h2>
      <button onClick={toggleDonationStatus} className="btn btn-primary">
        {donationStatus ? "Close Donations" : "Open Donations"}
      </button>
      {statistics && <StatisticalData statistics={statistics} />}
      {statistics && <AdminStatsTable statistics={statistics} />}
    </div>
  );
}
