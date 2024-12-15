import React from "react";
import {
  binaryChoiceContainer,
  binaryChoiceLabel,
  errorMessage,
  formLabel,
  formWrapper,
  hiddenInput,
  textFieldError,
} from "@/app/signup/form.css";

interface Props {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const BinaryChoice = ({ name, label, options, error }: Props) => {
  return (
    <div className={formWrapper}>
      <label htmlFor={name} className={formLabel}>
        {label}
      </label>
      <div
        className={`${binaryChoiceContainer} ${error ? textFieldError : ""}`}
      >
        {options.map((option) => (
          <label key={option.value} className={binaryChoiceLabel}>
            <input
              type="radio"
              name={name}
              value={option.value}
              className={hiddenInput}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className={errorMessage}>{error}</p>}
    </div>
  );
};
