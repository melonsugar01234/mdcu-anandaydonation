import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

interface DataTableProps {
  data: any[];
  onRowClick: (registration: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onRowClick }) => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "created_at", header: "Created At" },
      { accessorKey: "shipment_status", header: "Shipment Status" },
      { accessorKey: "payment_status", header: "Payment Status" },
      { accessorKey: "receipt", header: "Receipt" },
      { accessorKey: "card", header: "Card" },
      {
        accessorKey: "shirt",
        header: "Shirt",
        cell: (info) => (info.getValue() ? "Not Null" : "Null"),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <table className="min-w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getIsSorted()
                  ? header.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : " 🔼"
                  : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} onClick={() => onRowClick(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
