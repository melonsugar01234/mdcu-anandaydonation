// components/Filter.tsx

import React from "react";

interface FilterProps {
  onFilterChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="Filter status"
      onChange={(e) => onFilterChange(e.target.value)}
      className="p-2 border rounded-md"
    />
  );
};

export default Filter;

{
  /* {table?.getColumn && (
        <fieldset className="fieldset">
          <legend className="fieldset-legend">กรองสถานะ</legend>
          <input
            placeholder="กรุณาใส่เลขสถานะ"
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
            }
            className="input input-neutral input-sm border-2 border-gray-400"
          />
        </fieldset>
      )} */
}
