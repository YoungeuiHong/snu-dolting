import {
  binaryChoiceContainer,
  binaryChoiceLabel,
  errorMessage,
  formLabel,
  formWrapper,
  hiddenInput,
  textFieldError,
} from "@/app/signup/form.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  value: string | null | undefined;
  error?: string;
}

export const BinaryChoice = ({ name, label, options, value, error }: Props) => {
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
              defaultChecked={option.value === value}
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
