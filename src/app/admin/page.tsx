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

    if (status === "authenticated") {
      fetchStatistics();
    }
  }, [status]);

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
      {statistics && <StatisticalData statistics={statistics} />}
      {statistics && <AdminStatsTable statistics={statistics} />}
    </div>
  );
}
