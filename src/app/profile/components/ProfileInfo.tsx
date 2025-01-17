import {
  box,
  container,
  content,
  gradientOverlay,
  imageWrapper,
  introduction,
  introWrapper,
  nicknameFont,
  title,
} from "@/app/profile/[nickname]/page.css";
import { ImageWithFallback } from "@/components/image";
import { Religion, ReligionLabels } from "@/types/religion";
import { User } from "@/types/user";

interface Props {
  user: Partial<User>;
}

export const ProfileInfo = ({ user }: Props) => {
  return (
    <div className={container} style={{ paddingBottom: "10px" }}>
      <div className={imageWrapper}>
        <ImageWithFallback
          src={user.profile_picture || ""}
          alt="프로필 이미지"
          fill
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
        <div className={gradientOverlay} />
        <div className={introWrapper}>
          <p className={nicknameFont}>{user.nickname}</p>
          <p className={introduction}>{user.introduction}</p>
        </div>
      </div>
      <div className={box}>
        <div>
          <p className={title}>기본 정보</p>
          <p className={content}>• 출생년도 | {user.birth_year}년생</p>
          <p className={content}>
            • 종교 | {ReligionLabels[user.religion as Religion]}
          </p>
          <p className={content}>• 직업 | {user.job}</p>
          <p className={content}>
            • 학부 | {user.is_snu_graduate ? "자대" : "타대"}
          </p>
          <p className={content}>• 거주지 | {user.location}</p>
        </div>
      </div>
      <div className={box}>
        <p className={title}>나에 대한 소개</p>
        <p className={content}>{user.inner_description}</p>
      </div>
      <div className={box}>
        <div>
          <p className={title}>키 / 몸무게</p>
          <p className={content}>
            {user.height}cm / {user.weight}kg
          </p>
        </div>
        <div>
          <p className={title}>사진 교환 희망 여부</p>
          <p className={content}>
            {user.photo_exchange_intent ? "예" : "아니오"}
          </p>
        </div>
        <div>
          <p className={title}>내 외모에 대한 설명</p>
          <p className={content}>{user.appearance_description}</p>
        </div>
      </div>
      <div className={box}>
        <div>
          <p className={title}>이상형</p>
          <p className={content}>{user.ideal_type}</p>
        </div>
        <div>
          <p className={title}>연애 스타일</p>
          <p className={content}>{user.dating_style}</p>
        </div>
      </div>
      <div className={box}>
        <div>
          <p className={title}>재혼 희망 여부</p>
          <p className={content}>{user.remarriage_intent ? "예" : "아니요"}</p>
        </div>
        <div>
          <p className={title}>자녀 유무</p>
          <p className={content}>
            {user.has_children
              ? `유자녀 (아들 ${user.son_count}명, 딸 ${user.daughter_count}명)`
              : "무자녀"}
          </p>
        </div>
      </div>
    </div>
  );
};
