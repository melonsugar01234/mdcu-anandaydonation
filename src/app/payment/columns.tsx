"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
export type Payment = {
  created_at: string;
  updated_at: string;
  id: string;
  status: "0" | "1" | "2" | "3" | "4" | "99";
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
  // amount: number
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: " order",
    header:  "Order",
  },
  {
    accessorKey: "transferTime",
    header:  "Transfer time",
  },
  {
    accessorKey: "transferDate",
    header:  "Transfer date",
  },
  {
    accessorKey: "trackingNumber1",
    header:  "Tracking number 1",
  },
  {
    accessorKey: "trackingNumber2",
    header:  "Tracking number 2",
  },
  //amount
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "THB",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
