export const Checkbox: React.FC<{
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}> = ({ label, value, disabled, onChange }) => {
  return (
    <label className="fieldset-label">
      <input
        type="checkbox"
        className="checkbox checkbox-lg checkbox-primary"
        disabled={disabled}
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="text-base">{label}</span>
    </label>
  );
};
