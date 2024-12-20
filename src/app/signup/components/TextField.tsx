import React from "react";
import {
  errorMessage,
  formLabel,
  formWrapper,
  textField,
  textFieldError,
} from "@/app/signup/form.css";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string | null | undefined;
  error?: string;
}

export const TextField = ({
  name,
  label,
  placeholder,
  value,
  error,
}: Props) => {
  return (
    <div className={formWrapper}>
      <label htmlFor={name} className={formLabel}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value || undefined}
        className={`${textField} ${error ? textFieldError : ""}`}
      />
      {error && <p className={errorMessage}>{error}</p>}
    </div>
  );
};
