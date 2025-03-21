"use client";
import Link from "next/link";
import { User } from "@/types/user";
import { ImageWithFallback } from "@/components/image";
import { Religion, ReligionLabels } from "@/types/religion";
import {
  profileImage,
  userCard,
  userCardDetails,
  userCardHeader,
  userDetail,
  userInfo,
  userIntroduction,
  userName,
} from "@/app/(with-gnb)/home/components/UserCard.css";

interface UserCardProps {
  user: Partial<User>;
}

export const UserCard = ({ user }: UserCardProps) => (
  <Link
    key={user.nickname}
    href={`/profile/${encodeURIComponent(user.nickname || "")}`}
    style={{ textDecoration: "none" }}
  >
    <div className={userCard}>
      <div className={userCardHeader}>
        <div className={profileImage}>
          <ImageWithFallback
            src={user.profile_picture || null}
            alt="프로필 이미지"
            width={50}
            height={50}
            style={{
              borderRadius: "100px",
              objectFit: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>
        <div className={userInfo}>
          <p className={userName}>{user.nickname}</p>
          <p className={userIntroduction}>{user.introduction}</p>
        </div>
      </div>
      <div className={userCardDetails}>
        <p className={userDetail}>⏰ {user.birth_year}년생</p>
        <p className={userDetail}>
          📏 {user.height}cm / {user.weight}kg
        </p>
        <p className={userDetail}>
          👼🏻 {user.has_children ? "유자녀" : "무자녀"}
        </p>
        <p className={userDetail}>
          💍 {user.remarriage_intent ? "재혼의향 있음" : "재혼의향 없음"}
        </p>
        <p className={userDetail}>💻 {user.job}</p>
        <p className={userDetail}>📍 {user.location}</p>
        <p className={userDetail}>
          🙏🏻 {ReligionLabels[user.religion as Religion]}
        </p>
        <p className={userDetail}>🔖 {user.mbti}</p>
      </div>
    </div>
  </Link>
);
