import {
  container,
  message,
} from "@/app/(with-gnb)/main/components/NoResult.css";

export const NoResult = () => {
  return (
    <div className={container}>
      <p className={message}>사용자를 찾을 수 없습니다.</p>
    </div>
  );
};
