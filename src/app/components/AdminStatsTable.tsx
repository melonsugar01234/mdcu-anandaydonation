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
  Row,
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
  cardwithbox: number | null;
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
    cell: ({ row }: { row: Row<Register> }) =>
      formatDate(row.original.created_at),
  },
  {
    accessorKey: "edited_at",
    header: "วันที่แก้ไข",
    cell: ({ row }: { row: Row<Register> }) =>
      formatDate(row.original.edited_at),
  },
  {
    accessorKey: "tracking_code",
    header: "รหัสติดตาม",
    cell: ({ row }: { row: Row<Register> }) => (
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
    header: "สถานะการจัดส่ง",
    cell: ({ row }: { row: Row<Register> }) => {
      const status = row.original.shipment_status;
      const statusText: Record<string, string> = {
        "0": "กำลังตรวจสอบ",
        "1": "กำลังเตรียมของ",
        "2": "จัดส่งเข็มฯ / เสื้อเเล้ว",
        "3": "อยู่ระหว่างออกใบเสร็จ",
        "4": "จัดส่งใบเสร็จแล้ว",
        "5": "ไม่มีคำสั่งซื้อ",
        "99": "เกิดข้อผิดพลาด",
      };
      return statusText[status as keyof typeof statusText] || "ไม่ทราบ";
    },
  },
  { accessorKey: "name", header: "ชื่อ" },
  { accessorKey: "phone", header: "เบอร์โทร" },
  {
    accessorKey: "payment_status",
    header: "สถานะการชำระเงิน",
    cell: ({ row }: { row: Row<Register> }) => {
      const status = row.original.payment_status;
      const statusBadge = {
        Pending: <div className="badge badge-neutral">รอดำเนินการ</div>,
        Approved: <div className="badge badge-success">อนุมัติ</div>,
        Rejected: <div className="badge badge-error">ปฏิเสธ</div>,
      };

      return statusBadge[status as keyof typeof statusBadge] || <div>-</div>;
    },
  },
  {
  accessorKey: "itemReceived",
  header: "ประเภทของ",
  enableColumnFilter: true,
  cell: ({ row }) => {
    const { card, cardwithbox, shirts } = row.original;
    const hasCard = !!(card || cardwithbox);
    const hasShirt = !!(shirts && shirts.trim() !== "");

    if (hasCard && hasShirt) return "เข็มและเสื้อ";
    if (hasCard) return "เข็ม";
    if (hasShirt) return "เสื้อ";
    return "-";
  },
  filterFn: (row, columnId, filterValue) => {
    const { card, cardwithbox, shirts } = row.original;
    const hasCard = !!(card || cardwithbox);
    const hasShirt = !!(shirts && shirts.trim() !== "");

    if (filterValue === "เข็ม") {
      return hasCard;
    }
    if (filterValue === "เสื้อ") {
      return hasShirt;
    }
    if (filterValue === "เข็มและเสื้อ") {
      return hasCard && hasShirt;
    }
    return true;
  },
},
  {
    accessorKey: "receipt",
    header: "ขอใบเสร็จ",
    cell: ({ row }: { row: Row<Register> }) =>
      row.original.receipt === "yes" ? (
        <div className="badge badge-outline badge-success">ขอ</div>
      ) : (
        <div className="badge badge-outline badge-error">ไม่ขอ</div>
      ),
  },
];

const downloadExcel = (data: Register[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};

// Define the interface for your statistics data
interface AdminStatsTableProps {
  statistics: {
    // Add the properties that your statistics object contains
    totalDonators?: number;
    totalAmount?: number;
    // ... add other statistics properties
  };
}

export default function AdminStatsTable({ statistics }: AdminStatsTableProps) {
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
          placeholder="ค้นหาด้วยชื่อ"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="input input-bordered mr-2"
        />
        <input
          type="text"
          placeholder="ค้นหาด้วยโทรศัพท์"
          value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("phone")?.setFilterValue(e.target.value)
          }
          className="input input-bordered mr-2"
        />
        <button
          className="btn bg-green-400 btn-sm"
          onClick={() => downloadExcel(data)}
        >
          ดาวน์โหลด .xlsx
        </button>
      </div>

      <div className="mb-4">
        {/* Payment Status Filters */}
        <div className="mb-2">
          <span className="font-bold mr-2">สถานะการชำระเงิน:</span>
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
            รอดำเนินการ
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
            อนุมัติ
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
            ปฏิเสธ
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              table.getColumn("payment_status")?.setFilterValue("")
            }
          >
            ล้าง
          </button>
        </div>

        {/* Shipment Status Filters */}
        <div className="mb-2">
          <span className="font-bold mr-2">สถานะการจัดส่ง:</span>
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
            กำลังตรวจสอบ
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
            กำลังเตรียมของ
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
            จัดส่งเข็มฯ / เสื้อเเล้ว
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
            อยู่ระหว่างออกใบเสร็จ
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
            จัดส่งใบเสร็จแล้ว
          </button>
            <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("shipment_status")?.getFilterValue() === "5"
              ? "btn-neutral"
              : "btn-outline"
            }`}
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("5")
            }
            >
            ไม่มีคำสั่งซื้อ
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
            เกิดข้อผิดพลาด
            </button>
            <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              table.getColumn("shipment_status")?.setFilterValue("")
            }
            >
            ล้าง
            </button>
          </div>

          {/* Item Received Filters */}
          <div className="mb-2">
            <span className="font-bold mr-2">ประเภทของที่ระลึก:</span>
            <button
            className={`btn btn-sm mr-2 ${
              columnFilters.find((f) => f.id === "itemReceived")?.value === "เข็ม"
              ? "btn-neutral"
              : "btn-outline"
            }`}
            onClick={() =>
              table.setColumnFilters([
              ...columnFilters.filter((f) => f.id !== "itemReceived"),
              {
                id: "itemReceived",
                value: "เข็ม",
              },
              ])
            }
            >
            รับเข็ม
            </button>
            <button
            className={`btn btn-sm mr-2 ${
              columnFilters.find((f) => f.id === "itemReceived")?.value === "เสื้อ"
              ? "btn-neutral"
              : "btn-outline"
            }`}
            onClick={() =>
              table.setColumnFilters([
              ...columnFilters.filter((f) => f.id !== "itemReceived"),
              {
                id: "itemReceived",
                value: "เสื้อ",
              },
              ])
            }
            >
            รับเสื้อ
            </button>
            <button
            className={`btn btn-sm mr-2 ${
              columnFilters.find((f) => f.id === "itemReceived")?.value === "เข็มและเสื้อ"
              ? "btn-neutral"
              : "btn-outline"
            }`}
            onClick={() =>
              table.setColumnFilters([
              ...columnFilters.filter((f) => f.id !== "itemReceived"),
              {
                id: "itemReceived",
                value: "เข็มและเสื้อ",
              },
              ])
            }
            >
            รับเข็มและเสื้อ
            </button>
            <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              setColumnFilters(
              columnFilters.filter((f) => f.id !== "itemReceived")
              )
            }
            >
            ล้าง
            </button>
          </div>

        {/* Receipt Request Filters */}
        <div className="mb-2">
          <span className="font-bold mr-2">ขอใบเสร็จ:</span>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("receipt")?.getFilterValue() === "yes"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() => table.getColumn("receipt")?.setFilterValue("yes")}
          >
            ขอใบเสร็จ
          </button>
          <button
            className={`btn btn-sm mr-2 ${
              table.getColumn("receipt")?.getFilterValue() === "no"
                ? "btn-neutral"
                : "btn-outline"
            }`}
            onClick={() => table.getColumn("receipt")?.setFilterValue("no")}
          >
            ไม่ขอใบเสร็จ
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => table.getColumn("receipt")?.setFilterValue("")}
          >
            ล้าง
          </button>
        </div>
      </div>

      {/* table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table
            .getHeaderGroups()
            .map(
              (headerGroup: {
                id: React.Key | null | undefined;
                headers: any[];
              }) => (
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
              )
            )}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<Register>) => (
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
