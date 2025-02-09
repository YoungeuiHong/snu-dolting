import dynamic from "next/dynamic";
import { StylesConfig } from "react-select";
import { errorMessage, formLabel, formWrapper } from "@/app/signup/form.css";

import { Props as ReactSelectProps } from "react-select";

const ReactSelect = dynamic<ReactSelectProps>(
  () => import("react-select").then((mod) => mod.default),
  {
    ssr: false,
  },
);

const customStyles: StylesConfig = {
  container: (base) => ({
    ...base,
    width: "100%",
  }),
  control: (base) => ({
    ...base,
    width: "100%",
    height: "48px",
    borderRadius: "8px",
    border: "2px solid #eeeeee",
    ":hover": {
      borderColor: "#e0e0e0",
    },
    boxShadow: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#fee2e2"
      : state.isFocused
        ? "#fef2f2"
        : "#fff",
    color: state.isSelected ? "#dc2626" : "#424242",
    cursor: "pointer",
    padding: "10px 16px",
  }),
};

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  defaultValue: { value: string; label: string } | undefined;
  error?: string;
}

export const Select = ({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  error,
}: Props) => {
  return (
    <div className={formWrapper}>
      <label htmlFor={name} className={formLabel}>
        {label}
      </label>
      <ReactSelect
        options={options}
        name={name}
        styles={customStyles}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && <p className={errorMessage}>{error}</p>}
    </div>
  );
};
