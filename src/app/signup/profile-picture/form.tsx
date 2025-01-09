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
} from "@/app/signup/form.css";

interface Props {
  initialPicture: string | null;
}

export default function Form({ initialPicture }: Props) {
  const { state, formAction, pending } = useSignupForm(uploadProfilePicture, {
    profile_picture: initialPicture,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(initialPicture);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickBox = () => {
    if (inputRef != null && inputRef.current != null) {
      inputRef.current!.click();
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files: File[] = Array.from(event.target.files);

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
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
          ref={inputRef}
          type="file"
          name="profile_picture"
          hidden
          accept="image/*"
          onChange={onChangeFile}
        />

        {imageUrl && (
          <div className={profileImageContainer}>
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
          </div>
        )}
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
