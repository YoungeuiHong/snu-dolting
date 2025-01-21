import { container, message } from "@/components/no-result/NoResult.css";

interface Props {
  noResultMessage: string;
}

export const NoResult = ({ noResultMessage }: Props) => {
  return (
    <div className={container}>
      <p className={message}>{noResultMessage}</p>
    </div>
  );
};
