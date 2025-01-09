"use client";
import heic2any from "heic2any";

export const convertHeicToJpeg = async (file: File): Promise<File> => {
  if (file.type === "image/heic" || file.name.endsWith(".heic")) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
      });

      const convertedFile = new File(
        [convertedBlob as Blob],
        file.name.replace(/\.heic$/i, ".jpg"),
        { type: "image/jpeg" },
      );

      return convertedFile;
    } catch (error) {
      console.error("HEIC 변환 중 오류 발생:", error);
    }
  }

  return file;
};
