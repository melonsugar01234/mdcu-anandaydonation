import { MAX_ORDERS_PER_ITEM } from "@/config";
import { useId } from "react";

export const ItemAmount: React.FC<
  React.PropsWithChildren<{
    label: string;
    value: number;
    onChange?: (value: number) => void;
  }>
> = ({ children, label, value, onChange }) => {
  const inputId = useId();

  return (
    <div className="fieldset">
      <label className="fieldset-legend text-base" htmlFor={inputId}>
        {label}
      </label>
      <div className="flex flex-nowrap">
        <button
          type="button"
          className="btn btn-square btn-primary h-12 rounded-r-none"
          disabled={value <= 0}
          onClick={() => onChange?.(Math.max(Math.min(value - 1, MAX_ORDERS_PER_ITEM), 0))}
        >
          -
        </button>
        <input
          type="number"
          id={inputId}
          className={`input input-lg w-full rounded-none`}
          min={0}
          max={MAX_ORDERS_PER_ITEM}
          step={1}
          value={value}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (Number.isFinite(value))
              onChange?.(Math.max(Math.min(Math.trunc(value), MAX_ORDERS_PER_ITEM), 0));
          }}
        />
        <button
          type="button"
          className="btn btn-square btn-primary h-12 rounded-l-none"
          disabled={value >= MAX_ORDERS_PER_ITEM}
          onClick={() => onChange?.(Math.max(Math.min(value + 1, MAX_ORDERS_PER_ITEM), 0))}
        >
          +
        </button>

        {children}
      </div>
    </div>
  );
};
