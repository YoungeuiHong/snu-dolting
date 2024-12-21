import React, { HTMLInputTypeAttribute } from "react";
import {
  errorMessage,
  formLabel,
  formWrapper,
  textField,
  textFieldError,
  inputWrapperWithUnit,
  unitLabel,
} from "@/app/signup/form.css";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string | number | null | undefined;
  error?: string;
  type?: HTMLInputTypeAttribute;
  unit?: string;
}

export const TextField = ({
  name,
  label,
  placeholder,
  value,
  error,
  type,
  unit,
}: Props) => {
  return (
    <div className={formWrapper}>
      <label htmlFor={name} className={formLabel}>
        {label}
      </label>
      <div className={inputWrapperWithUnit}>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={value === null ? undefined : value}
          className={`${textField} ${error ? textFieldError : ""}`}
          type={type}
        />
        {unit && <span className={unitLabel}>{unit}</span>}
      </div>
      {error && <p className={errorMessage}>{error}</p>}
    </div>
  );
};
