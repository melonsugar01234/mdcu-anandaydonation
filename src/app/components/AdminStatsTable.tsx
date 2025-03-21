"use client";

import Link from "next/link";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

export const columns: ColumnDef<Register>[] = [
  {
    accessorKey: "created_at",
    header: "วันที่สร้าง",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "edited_at",
    header: "วันที่อัพเดต",
    cell: ({ row }) => formatDate(row.original.edited_at),
  },
  {
    accessorKey: "tracking_code",
    header: "รหัสติดตาม",
    cell: ({ row }) => (
      <Link
        href={`/admin/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.original.tracking_code}
      </Link>
    ),
  },
  { accessorKey: "shipment_status", header: "สถานะ" },
  { accessorKey: "name", header: "ชื่อ" },
  { accessorKey: "phone", header: "โทรศัพท์" },
];

export default function AdminStatsTable() {
  const [data, setData] = useState<Register[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/register")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Table</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
