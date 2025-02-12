"use client";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { SubmitButton } from "@/app/signup/components";
import { useSignupForm } from "@/app/signup/hooks/useSignupForm";
import { uploadProfilePicture } from "@/app/signup/profile-picture/action";
import {
  container,
  contentContainer,
  errorMessage,
  imageUploadButton,
  profileImageContainer,
  subtitle,
  title,
  titleWrapper,
  uploadLoading,
} from "@/app/signup/form.css";
import { convertHeicToJpeg } from "@/utils/image";
import { uploadPublicImage } from "@/utils/supabase/storage";
import { createClient } from "@/utils/supabase/client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "sonner";

interface Props {
  initialPicture: string | null;
}

export default function Form({ initialPicture }: Props) {
  const { state, formAction, pending } = useSignupForm(uploadProfilePicture, {
    profile_picture: initialPicture,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(initialPicture);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickBox = () => {
    if (inputRef != null && inputRef.current != null) {
      inputRef.current!.click();
    }
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files: File[] = Array.from(event.target.files);

    let file = files[0];

    if (!file) return;

    setIsUploading(true);

    try {
      if (file.type === "image/heic" || file.name.endsWith(".heic")) {
        file = await convertHeicToJpeg(file);
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("인증되지 않은 사용자입니다.");
      }

      const publicUrl = await uploadPublicImage(
        file,
        `public/${user.id}/${Date.now()}`,
        "profiles",
      );

      const profileInput = document.querySelector<HTMLInputElement>(
        'input[name="profile_picture"]',
      );
      if (profileInput) {
        profileInput.value = publicUrl;
      }

      setImageUrl(publicUrl);
    } catch (e) {
      console.error("이미지 업로드에 실패했습니다: ", e);
      toast("이미지 업로드에 실패했습니다");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form action={formAction} className={container}>
      <div className={contentContainer}>
        <div className={titleWrapper}>
          <p className={title}>프로필 사진을 업로드 해주세요</p>
          <p className={subtitle}>
            나를 잘 표현할 수 있는 사진을 업로드해주세요.
          </p>
          <p className={subtitle}>얼굴이 나온 사진이 아니어도 괜찮아요.</p>
        </div>
        <div className={imageUploadButton} onClick={onClickBox}>
          <Image
            src="/icon/camera.svg"
            alt="사진 업로드"
            width={24}
            height={24}
          />
        </div>
        {state.errors?.profile_picture && (
          <p className={errorMessage}>{state.errors?.profile_picture}</p>
        )}
        <input
          type="text"
          name="profile_picture"
          hidden
          defaultValue={state.user?.profile_picture || undefined}
        />
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*,image/heic"
          onChange={onChangeFile}
        />

        <div className={profileImageContainer}>
          {isUploading ? (
            <div className={uploadLoading}>
              <div style={{ height: "40px" }}>
                <DotLottieReact src="/lottie/loading.lottie" loop autoplay />
              </div>
              <span>이미지 업로드 중입니다</span>
            </div>
          ) : (
            imageUrl && (
              <Image
                src={imageUrl}
                alt="프로필 이미지"
                sizes="300px"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "left top",
                }}
              />
            )
          )}
        </div>
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
