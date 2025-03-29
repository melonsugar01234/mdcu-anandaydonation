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
  ColumnFiltersState,
} from "@tanstack/react-table";

import * as XLSX from "xlsx";

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
    header: "created at",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    accessorKey: "edited_at",
    header: "edited at",
    cell: ({ row }) => formatDate(row.original.edited_at),
  },
  {
    accessorKey: "tracking_code",
    header: "tracking code",
    cell: ({ row }) => (
      <Link
        href={`/admin/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.original.tracking_code}
      </Link>
    ),
  },
  {
    accessorKey: "shipment_status",
    header: "shipment status",
    cell: ({ row }) => {
      const status = row.original.shipment_status;
      const statusText = {
        "0": "0 (Verifying Payment)",
        "1": "1 (Preparing)",
        "2": "2 (Shipped)",
        "3": "3 (Processing Receipt)",
        "4": "4 (Receipt Shipped)",
        "5": "5 (No order)",
        "99": "99 (Error)",
      };
      return statusText[status as keyof typeof statusText] || "Unknown";
    },
  },
  { accessorKey: "name", header: "name" },
  { accessorKey: "phone", header: "phone" },
  {
    accessorKey: "payment_status",
    header: "payment status",
    cell: ({ row }) => {
      const status = row.original.payment_status;
      const statusBadge = {
        Pending: <div className="badge badge-neutral">Pending</div>,
        Approved: <div className="badge badge-success">Approved</div>,
        Rejected: <div className="badge badge-error">Rejected</div>,
      };

      return statusBadge[status as keyof typeof statusBadge] || <div>-</div>;
    },
  },
];

const downloadExcel = (data: Register[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};

export default function AdminStatsTable() {
  const [data, setData] = useState<Register[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    fetch("/api/register")
      .then((res) => res.json())
      .then((data) => {
        // Sort by payment_status: Pending -> Approved -> Rejected
        const sortedData = [...data].sort((a, b) => {
          const order = { Pending: 0, Approved: 1, Rejected: 2 };
          return (
            (order[a.payment_status as keyof typeof order] ?? 3) -
            (order[b.payment_status as keyof typeof order] ?? 3)
          );
        });

        setData(sortedData);
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
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="Search by phone"
          value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("phone")?.setFilterValue(e.target.value)
          }
          className="input input-bordered mr-2"
        />
        <button className="btn btn-sm" onClick={() => downloadExcel(data)}>
          ดาวน์โหลด .xlsx
        </button>
      </div>

      <div className="mb-4">
        {/* Payment Status Filters */}
        <div className="mb-2">
          <span className="font-bold mr-2">Payment Status:</span>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("payment_status")?.getFilterValue() === "Pending"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("payment_status")?.setFilterValue("Pending")
            }
          >
            Pending
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("payment_status")?.getFilterValue() === "Approved"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("payment_status")?.setFilterValue("Approved")
            }
          >
            Approved
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("payment_status")?.getFilterValue() === "Rejected"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("payment_status")?.setFilterValue("Rejected")
            }
          >
            Rejected
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              table.getColumn("payment_status")?.setFilterValue("")
            }
          >
            Clear
          </button>
        </div>

        {/* Shipment Status Filters */}
        <div>
          <span className="font-bold mr-2">Shipment Status:</span>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "0"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("0")
            }
          >
            Verifying Payment
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "1"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("1")
            }
          >
            Preparing
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "2"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("2")
            }
          >
            Shipped
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "3"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("3")
            }
          >
            Processing Receipt
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "4"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("4")
            }
          >
            Receipt Shipped
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "99"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("99")
            }
          >
            Error
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("")
            }
          >
            Clear
          </button>
        </div>
      </div>

      {/* table */}
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
