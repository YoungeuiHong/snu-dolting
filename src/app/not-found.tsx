import Link from "next/link";
import {
  homeButton,
  notFoundContainer,
  notFoundMessage,
} from "@/app/not-found.css";

export default async function NotFound() {
  return (
    <div className={notFoundContainer}>
      <p className={notFoundMessage}>존재하지 않는 페이지입니다</p>
      <Link href="/home" className={homeButton}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
