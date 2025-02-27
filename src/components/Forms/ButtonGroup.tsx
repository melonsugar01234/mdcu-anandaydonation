import { useId } from "react";

type Props<Vs extends string, V extends Vs> = {
  className?: string;
  label: string;
  value: V;
  values: { value: Vs; label: string }[];
  onChange?: (value: Vs) => void;
};

/**
 * Form Button Group.
 */
export const ButtonGroup = (<Vs extends string, V extends Vs>({
  className,
  label,
  value,
  values,
  onChange,
}: Props<Vs, V>) => {
  const radioName = useId();

  return (
    <fieldset className={`fieldset form-control ${className ?? ""}`}>
      <legend className="fieldset-legend text-base">{label}</legend>

      <div className="join">
        {values.map((v) => {
          return (
            <input
              key={v.value}
              type="radio"
              name={radioName}
              className={`join-item btn ${className ?? ""}`}
              aria-label={v.label}
              value={v.value}
              checked={v.value === value}
              onChange={(e) => onChange?.(e.target.value as typeof value)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}) satisfies React.FC<Props<string, string>>;
