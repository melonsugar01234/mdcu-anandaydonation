// ExportButton.tsx
import React from "react";
import * as XLSX from "xlsx";

type ExportButtonProps = {
  data: any[];
  fileName?: string;
};

const ExportButton: React.FC<ExportButtonProps> = ({ data, fileName = "data.xlsx" }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={exportToExcel}
      className="btn btn-sm"
    >
        ดาวน์โหลด .xlsx
    </button>
  );
};

export default ExportButton;
