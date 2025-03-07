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
    status: "4",
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
    status: "2",
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
      <div className="p-4 max-h-[500px] overflow-auto">
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
      <fieldset className="fieldset">
        <legend className="fieldset-legend">กรองสถานะ</legend>
        <select defaultValue="Pick a browser" className="select">
          <option disabled={true}>กรุณาเลือกเลขสถานะ</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>99</option>
        </select>
      </fieldset>
    </>
  );
};

export default Table;
