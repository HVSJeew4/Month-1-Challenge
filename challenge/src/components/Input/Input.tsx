import { ChangeEvent, FocusEvent, useId } from "react";

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  label?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
  label,
  onFocus,
  onBlur,
}: InputProps) {
  const reactId = useId();
  const inputId = label
    ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
    : reactId;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? "input-error" : ""}`}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span
          id={`${inputId}-error`}
          className="input-error-text"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}
