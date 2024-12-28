"use client";
import React, { useState } from "react";
import {
  errorMessage,
  formLabel,
  formWrapper,
  textArea,
  textAreaWrapper,
  textAreaCounter,
  textFieldError,
} from "@/app/signup/form.css";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string | null | undefined;
  error?: string;
}

export const TextArea = ({ name, label, placeholder, value, error }: Props) => {
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className={formWrapper}>
      <label htmlFor={name} className={formLabel}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value || ""}
        onChange={handleChange}
        className={`${textArea} ${error ? textFieldError : ""}`}
      />
      <div className={textAreaWrapper}>
        {error ? <span className={errorMessage}>{error}</span> : <span />}
        <span className={textAreaCounter}>{charCount}자</span>
      </div>
    </div>
  );
};
