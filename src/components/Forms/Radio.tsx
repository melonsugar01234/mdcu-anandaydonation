import { createContext, useContext, useId } from "react";

type RadioContextT = {
  name: string;
  value: string;
  setValue: (value: string) => void;
};

const RadioContext = createContext<RadioContextT | undefined>(undefined);

/**
 * Form Radio.
 */
export const RadioSet: React.FC<
  React.PropsWithChildren<{
    className?: string;
    label: string;
    value: string;
    onChange?: (value: string) => void;
  }>
> = ({ children, className, label, value, onChange }) => {
  const radioName = useId();

  return (
    <fieldset className={`fieldset form-control ${className ?? ""}`}>
      <legend className="fieldset-legend text-base">{label}</legend>
      <RadioContext.Provider
        value={{ name: radioName, value, setValue: (value) => onChange?.(value) }}
      >
        {children}
      </RadioContext.Provider>
    </fieldset>
  );
};

export const Radio: React.FC<{ className?: string; label: string; value: string }> = ({
  className,
  label,
  value,
}) => {
  const radioContext = useContext(RadioContext);
  const inputId = useId();

  if (!radioContext) return <p>This element cannot be used outside RadioSet!</p>;

  return (
    <label className="label cursor-pointer" htmlFor={inputId}>
      <input
        type="radio"
        className={`radio radio-lg ${className ?? ""}`}
        name={radioContext.name}
        id={inputId}
        value={value}
        checked={value === radioContext.value}
        onChange={(e) => radioContext.setValue(e.target.value)}
      />
      <span className="label-text text-base select-none">{label}</span>
    </label>
  );
};
