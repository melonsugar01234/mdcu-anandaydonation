import { useId, useMemo } from "react";

export const TimePicker: React.FC<{
  label: string;
  value: Date;
  validate?: boolean | string;
  onChange?: (value: Date) => void;
}> = ({ label, value, validate, onChange }) => {
  const inputId = useId();

  // The datetime picker has some funny timezone issues!
  const transferInLocalTimezone = useMemo(() => {
    return new Date(value.valueOf() - value.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }, [value]);

  return (
    <fieldset className="fieldset">
      <label className="fieldset-legend text-base" htmlFor={inputId}>
        {label}
      </label>

      <input
        required
        type="datetime-local"
        className={`input ${validate ? "validator" : ""}`}
        value={transferInLocalTimezone}
        onChange={(e) => {
          if (e.target.value) {
            const d = new Date(`${e.target.value}Z`);
            onChange?.(new Date(d.valueOf() + d.getTimezoneOffset() * 60000));
          }
        }}
      />

      {typeof validate === "string" && <div className="validator-hint hidden">{validate}</div>}
    </fieldset>
  );
};
