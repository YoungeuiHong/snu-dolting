import { Skeleton } from "@/components/skeleton/Skeleton";
import {
  chatContainer,
  chatHeader,
  inputContainer,
  messageContainer,
  messageMeWrapper,
  messageOtherWrapper,
} from "@/app/chat/[roomId]/page.css";

export default function Loading() {
  return (
    <div className={chatContainer}>
      <div className={chatHeader}>
        <Skeleton width={30} height={30} borderRadius={30} />
        <Skeleton width={200} height={30} borderRadius={10} />
      </div>
      <div className={messageContainer}>
        <div className={messageMeWrapper}>
          <Skeleton width={200} height={41} borderRadius="18px 18px 0 18px" />
        </div>
        <div className={messageMeWrapper}>
          <Skeleton width={100} height={41} borderRadius="18px 18px 0 18px" />
        </div>
        <div className={messageOtherWrapper}>
          <Skeleton width={180} height={41} borderRadius="18px 18px 18px 0" />
        </div>
        <div className={messageOtherWrapper}>
          <Skeleton width={220} height={41} borderRadius="18px 18px 18px 0" />
        </div>
      </div>
      <div className={inputContainer}>
        <Skeleton height={43} borderRadius={20} />
      </div>
    </div>
  );
}
