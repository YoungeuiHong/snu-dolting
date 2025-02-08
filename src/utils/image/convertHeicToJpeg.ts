"use client";
import heic2any from "heic2any";
import EXIF from "exif-js";

const fixImageOrientation = async (blob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      try {
        EXIF.getData(
          img as unknown as string,
          function (this: Record<string, unknown>) {
            const orientation = EXIF.getTag(this, "Orientation") || 1;

            // 회전이 필요 없는 경우, 그대로 Blob 반환
            if (orientation === 1) {
              resolve(blob);
              return;
            }

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const width = img.width;
            const height = img.height;

            if (orientation >= 5 && orientation <= 8) {
              canvas.width = height;
              canvas.height = width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }

            switch (orientation) {
              case 3: // 180도 회전
                ctx?.translate(width, height);
                ctx?.rotate(Math.PI);
                break;
              case 6: // 시계 방향 90도
                ctx?.translate(height, 0);
                ctx?.rotate(Math.PI / 2);
                break;
              case 8: // 반시계 방향 90도
                ctx?.translate(0, width);
                ctx?.rotate(-Math.PI / 2);
                break;
            }

            ctx?.drawImage(img, 0, 0);
            canvas.toBlob((fixedBlob) => {
              if (fixedBlob) {
                resolve(fixedBlob);
              } else {
                reject(new Error("캔버스에서 이미지 Blob 생성 실패"));
              }
            }, "image/jpeg");
          },
        );
      } catch (err) {
        reject(new Error("이미지 회전 처리 중 에러 발생: " + err));
      }
    };

    img.onerror = () => reject(new Error("이미지를 로드하는 중 오류 발생"));
  });
};

export const convertHeicToJpeg = async (file: File): Promise<File> => {
  if (file.type === "image/heic" || file.name.endsWith(".heic")) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });

      const optimizedBlob = await fixImageOrientation(convertedBlob as Blob);

      return new File([optimizedBlob], file.name.replace(/\.heic$/i, ".jpg"), {
        type: "image/jpeg",
      });
    } catch (error) {
      throw new Error("HEIC 이미지를 JPEG로 변환하는 중 오류 발생: " + error);
    }
  }

  return file;
};
