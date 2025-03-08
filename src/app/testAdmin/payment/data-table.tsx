"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    // getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">กรองสถานะ</legend>
        <input
          placeholder="กรุณาใส่เลขสถานะ"
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="input input-neutral input-sm border-2 border-gray-400"
        />
      </fieldset>
      <div className="flex space-x-2 py-2">
        {/* สำรอง ใช้ดูคนรับ ไม่รับใบเสร็จ แบบไม่พิไจารณาเงื่อนไขอื่น */}
        {["true", "false"].map((status) => (
          <button
            key={status}
            onClick={() => {
              const value = status === "true" ? true : false;
              table.getColumn("receipt")?.setFilterValue(value);
            }}
            className={`btn btn-sm border-2 ${
              table.getColumn("receipt")?.getFilterValue() ===
              (status === "true")
                ? "btn-neutral"
                : "btn-outline"
            }`}
          >
            {status}
          </button>
        ))}
        {/* รวมรับใบเสร็จทุกกรณี */}
        <button
          onClick={() => {
            table.getColumn("receipt")?.setFilterValue(true);
          }}
          className={`btn btn-sm border-2 ${
            table.getColumn("receipt")?.getFilterValue()
              ? "btn-neutral"
              : "btn-outline"
          }`}
        >
          รับใบเสร็จทุกกรณี
        </button>
        {/* รับใบเสร็จ ไม่รับเสื้อไม่รับเข็ม */}
        <button
          onClick={() => {
            const receiptColumn = table.getColumn("receipt");
            const shirtColumn = table.getColumn("buyShirt");
            const singlePinColumn = table.getColumn("singlePinAmount");
            const pinSetColumn = table.getColumn("pinSetAmount");

            if (
              receiptColumn &&
              shirtColumn &&
              singlePinColumn &&
              pinSetColumn
            ) {
              receiptColumn.setFilterValue(true); // กรอง receipt
              shirtColumn.setFilterValue(false); // ไม่ซื้อเสื้อ
              singlePinColumn.setFilterValue(
                (value: number) => value <= 0
              ); // pin 0
              pinSetColumn.setFilterValue(
                (value: number) => value <=0
              ); // set pin 0
            }
          }}
          className={`btn btn-sm border-2 ${
            table.getColumn("receipt")?.getFilterValue() === true &&
            table.getColumn("buyShirt")?.getFilterValue() === false &&
            typeof table.getColumn("singlePinAmount")?.getFilterValue() ===
              "function" &&
            (
              table.getColumn("singlePinAmount")?.getFilterValue() as (
                value: number
              ) => boolean
            )(3) &&
            typeof table.getColumn("pinSetAmount")?.getFilterValue() ===
              "function" &&
            (
              table.getColumn("pinSetAmount")?.getFilterValue() as (
                value: number
              ) => boolean
            )(3)
              ? "btn-neutral"
              : "btn-outline"
          }`}
        >
          รับใบเสร็จอย่างเดียว
        </button>
        <button
          onClick={() => {
            const columnsToClear = [
              "receipt",
              "buyShirt",
              "singlePinAmount",
              "pinSetAmount",
            ]; // ระบุชื่อคอลัมน์ที่ต้องการล้าง
            columnsToClear.forEach((col) => {
              table.getColumn(col)?.setFilterValue(null);
            });
          }}
          className="btn btn-sm btn-outline border-2"
        >
          ล้างตัวกรองทั้งหมด
        </button>
      </div>

      <div className="py-4 max-h-[500px] overflow-auto">
        <table className="whitespace-nowrap min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 p-2 text-left font-medium"
                  >
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
              <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-gray-300 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
