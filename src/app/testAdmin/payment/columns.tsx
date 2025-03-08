"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
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
    // amount: number
  };
  export const columns: ColumnDef<Payment>[] = [
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
        header: "Email",
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
  ]