"use client";
import React from "react";
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

import * as XLSX from "xlsx";

type Person = {
  created_at: string;
  updated_at: string;
  id: string;
  status: "0" | "1" | "2" | "3" | "4" | "5" | "99";
  name: string;
  telephone: string;
  email: string;
  address: string;
  donate: boolean;
  donateAmount: number;
  singlePinAmount: number;
  pinSetAmount: number;
  receipt: boolean;
  nationalId: string;
  receiptName: string;
  receiptAddress: string;
  buyShirt: boolean;
  order: number;
  transferTime: string;
  transferDate: string;
  trackingNumber1: string;
  trackingNumber2: string;
};

const data: Person[] = [
  //fetch data here
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "99",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 0,
    pinSetAmount: 0,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 0,
    pinSetAmount: 0,
    receipt: false,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: true,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "4",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 0,
    pinSetAmount: 0,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "3",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: false,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: true,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "2",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: false,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: false,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: false,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
  {
    created_at: "2025-01-15 @ 17:41",
    updated_at: "2025-01-15 @ 17:41",
    id: "adada",
    status: "1",
    name: "้กกืๆกๆๆ ไดไดได",
    telephone: "0875774688",
    email: "bfwbfwlfbwbfwfwf@gmail.com",
    address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
    donate: true,
    donateAmount: 968576647,
    singlePinAmount: 23,
    pinSetAmount: 32,
    receipt: true,
    nationalId: "12612624121725",
    receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
    receiptAddress:
      "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
    buyShirt: false,
    order: 4,
    transferTime: "20.14",
    transferDate: "1 มกราคม 2025",
    trackingNumber1: "2363138",
    trackingNumber2: "857648",
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "created_at",
    header: "Create at",
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "donate",
    header: "Donate",
  },
  {
    accessorKey: "donateAmount",
    header: "Donate amount",
  },
  {
    accessorKey: "singlePinAmount",
    header: "single pin amount",
  },
  {
    accessorKey: "pinSetAmount",
    header: "Pin set amount",
  },
  {
    accessorKey: "receipt",
    header: "Receipt",
  },
  {
    accessorKey: "nationalId",
    header: "national ID",
  },
  {
    accessorKey: "receiptName",
    header: "Receipt Name",
  },
  {
    accessorKey: "receiptAddress",
    header: "Receipt address",
  },
  {
    accessorKey: "buyShirt",
    header: "Buy shirt",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "transferTime",
    header: "Transfer time",
  },
  {
    accessorKey: "transferDate",
    header: "Transfer date",
  },
  {
    accessorKey: "trackingNumber1",
    header: "Tracking number 1",
  },
  {
    accessorKey: "trackingNumber2",
    header: "Tracking number 2",
  },
];

const Table: React.FC = () => {
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

  const downloadExcel = (data: Person[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const filteredRowCount = table.getFilteredRowModel().rows.length;

  //รวมเข็มเดี่ยว
  const totalSinPin = table.getRowModel().rows.reduce((sum, row) => {
    const singPinSum = row.original.singlePinAmount;
    return sum + (singPinSum || 0); // บวกค่าเข้ากับผลรวม (ตรวจสอบว่าเป็นตัวเลข)
  }, 0);

  //รวมเข็มชุด
  const totalPinSet = table.getRowModel().rows.reduce((sum, row) => {
    const pinSetSum = row.original.pinSetAmount;
    return sum + (pinSetSum || 0); // บวกค่าเข้ากับผลรวม (ตรวจสอบว่าเป็นตัวเลข)
  }, 0);

  //บริจาคอย่างเดียว
  const donateOnly = table.getRowModel().rows.filter(
    row => row.original.donate === true && row.original.buyShirt===false&&row.original.singlePinAmount ===0 && row.original.pinSetAmount ===0
  ).length;

  //บริจาค ซื้อเสื้อ
  const donateShirt = table.getRowModel().rows.filter(
    row => row.original.donate === true && row.original.buyShirt===true&&row.original.singlePinAmount ===0 && row.original.pinSetAmount ===0
  ).length;

  //บริจาค ซื้อเข็ม
  const donatePin = table.getRowModel().rows.filter(
    row => row.original.donate === true && row.original.buyShirt===false&&(row.original.singlePinAmount >0 || row.original.pinSetAmount >0)
  ).length;

  //บริจาค ซื้อเสื้อ เข็ม
  const donateShirtPin = table.getRowModel().rows.filter(
    row => row.original.donate === true && row.original.buyShirt===true&&row.original.singlePinAmount >0 && row.original.pinSetAmount >0
  ).length;


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
        {/* <button
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
        </button> */}
        {/* รับใบเสร็จ ไม่รับเสื้อไม่รับเข็ม */}
        {/* <button
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
              singlePinColumn.setFilterValue((value: number) => value <= 0); // pin 0
              pinSetColumn.setFilterValue((value: number) => value <= 0); // set pin 0
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
        </button> */}
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
      {/* <button onClick={() => this.downloadExcel(data)}>
        Download As Excel
      </button> */}
      <button className="btn btn-sm" onClick={() => downloadExcel(data)}>
        ดาวน์โหลด .xlsx
      </button>
      {/* <button onClick={() => downloadExcel(data)}>Export to Excel</button> */}

      {/* แสดงผลจำนวนแถวที่กรอง */}
      {/* <h1>Filtered Row Count: {filteredRowCount}</h1> */}

      <div>
            <div className="my-5">
              จำนวนคนบริจาคทั้งหมด : {filteredRowCount} <br />
              จำนวนคนที่บริจาคแต่ไม่ซื้อของ : {donateOnly}
              <br />
              จำนวนคนที่บริจาคซื้อเสื้อ : {donateShirt} <br />
              จำนวนคนที่บริจาคซื้อเข็ม :  {donatePin}<br />
              จำนวนที่บริจาคซื้อเสื้อและเข็ม : {donateShirtPin} <br />
            </div>
            <div className="my-5">
              จำนวนเข็มเดี่ยวทั้งหมด : {totalSinPin}
              <br />
              จำนวนเข็มชุดทั้งหมด : {totalPinSet}<br />
            </div>
            <div className="my-5">
              จำนวนเสื้อสีแดงไซส์ XS ทั้งหมด : 
              <br />
              จำนวนเสื้อสีแดงไซส์ S ทั้งหมด :  <br />
              จำนวนเสื้อสีแดงไซส์ M ทั้งหมด :  <br />
              จำนวนเสื้อสีแดงไซส์ L ทั้งหมด :  <br />
              จำนวนเสื้อสีแดงไซส์ XL ทั้งหมด : <br />
              จำนวนเสื้อสีแดงไซส์ 2XL ทั้งหมด :  <br />
              จำนวนเสื้อสีแดงไซส์ 3XL ทั้งหมด : <br />
            </div>
            <div className="my-5">
              จำนวนเสื้อสีครีมไซส์ XS ทั้งหมด :  <br />
              จำนวนเสื้อสีครีมไซส์ S ทั้งหมด : <br />
              จำนวนเสื้อสีครีมไซส์ M ทั้งหมด :  <br />
              จำนวนเสื้อสีครีมไซส์ L ทั้งหมด : <br />
              จำนวนเสื้อสีครีมไซส์ XL ทั้งหมด :  <br />
              จำนวนเสื้อสีครีมไซส์ 2XL ทั้งหมด :  <br />
              จำนวนเสื้อสีครีมไซส์ 3XL ทั้งหมด : 
              <br />
            </div>
          </div>

    </>
  );
};

export default Table;
