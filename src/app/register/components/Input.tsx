'use client';

interface InputProps {
  label: string;
  id: string;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
}
export default function Input({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  description,
  errorMsg,
}: InputProps) {
  const { updateNewRegistrationDetails, newRegistrationData } = useAddRegistrationContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNewRegistrationDetails({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label className="block text-lg" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-gray-400 block mb-1">
            {description}
          </span>
        )}
      </label>
      <input
        className={`input input-bordered w-full max-w-xs ${
          errorMsg ? 'border-red-500' : 'border-slate-300'
        } border-2`}
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        min={min}
        max={max}
        onChange={handleInputChange}
        defaultValue={newRegistrationData[id]}
      />
      <div className="min-h-8 mt-1">
        {errorMsg && (
          <span className="text-red-500 text-sm block ">{errorMsg}</span>
        )}
      </div>
    </div>
  );
}
function useAddRegistrationContext() {

  const updateNewRegistrationDetails = (details: any) => {

  };

  const newRegistrationData: { [key: string]: any } = {
  
  };

  return { updateNewRegistrationDetails, newRegistrationData };
}
