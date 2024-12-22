import Link from "next/link";
import { container, subTitle, title } from "@/app/signup-done/page.css";
import { blackRoundButton, bottomBar } from "@/app/shared.css";
import { ClapLottie } from "@/app/signup-done/clap.lottie";
import { getUserInfo } from "@/utils/user";

export default async function SingUpDonePage() {
  const { nickname } = await getUserInfo(["nickname"]);

  return (
    <div className={container}>
      <ClapLottie />
      <p className={subTitle}>회원가입 완료!</p>
      <p className={title}>{nickname}님,</p>
      <p className={title} style={{ marginBottom: "40px" }}>
        환영해요!
      </p>
      <div className={bottomBar}>
        <Link href="/main">
          <button className={blackRoundButton}>스누돌팅 이용하러 가기</button>
        </Link>
      </div>
    </div>
  );
}
