import { omit } from "@/utils/utils";
import { useId } from "react";

type OmitProps = "label" | "validate" | "onChange" | "useTextarea" | "className";

type FwdProps =
  | (Omit<
      React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
      OmitProps
    > & {
      useTextarea?: false;
    })
  | (Omit<
      React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >,
      OmitProps
    > & {
      useTextarea: true;
    });

type Props = FwdProps & {
  label: string;
  isInFieldSet?: boolean;
  validate?: boolean | string;
  className?: string;
  onChange?: (value: string) => void;
};

/**
 * Form Input component.
 * - Set isInFieldSet to enable change the class of the label (for when used in field set)
 * - Set validate to enable validation, set to string to also enable message
 * - Set useTextarea to use multi-line textarea instead of single-line input
 */
export const Input: React.FC<Props> = (props) => {
  const { label, isInFieldSet, validate, className: fwdClassName, onChange, ...fwdProps } = props;
  const inputId = useId();

  return (
    <div className={!isInFieldSet ? "fieldset" : ""}>
      <label
        className={`${isInFieldSet ? "fieldset-label" : "fieldset-legend"} text-base`}
        htmlFor={inputId}
      >
        {label}
      </label>
      {fwdProps.useTextarea ? (
        <textarea
          id={inputId}
          {...omit(fwdProps, "useTextarea")}
          className={`textarea textarea-lg field-sizing-content min-h-[4lh] w-full resize-none overflow-x-auto whitespace-nowrap ${validate ? "validator" : ""} ${fwdClassName ?? ""}`}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          id={inputId}
          {...omit(fwdProps, "useTextarea")}
          className={`input input-lg w-full ${validate ? "validator" : ""} ${fwdClassName ?? ""}`}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {typeof validate === "string" && <div className="validator-hint hidden">{validate}</div>}
    </div>
  );
};
