import {
  container,
  gradientOverlay,
  loginButton,
  loginButtonText,
  logo,
} from "./main.css";

export default function Home() {
  return (
    <div>
      <main className={container}>
        <p className={logo}>{`돌싱글즈\nin SNU`}</p>
        <button className={loginButton}>
          <span className={loginButtonText}>구글로 시작하기</span>
        </button>
        <div className={gradientOverlay} />
      </main>
    </div>
  );
}
