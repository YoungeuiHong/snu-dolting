"use server";
import { createClient } from "@/utils/supabase/server";
import sharp from "sharp";

export const uploadImage = async (
  file: File,
  fileName: string,
  bucketName: string,
) => {
  const supabase = await createClient();

  try {
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const compressedBuffer = await sharp(buffer)
      .resize(650, 1080, { fit: "inside" })
      .jpeg({ quality: 80 })
      .toBuffer();

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, compressedBuffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
      });

    if (error) {
      console.error("이미지 업로드 실패: ", error);
      throw new Error("이미지 업로드 실패");
    }

    const { data: urlData, error: urlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 30);

    if (urlError) {
      console.error("이미지 전송 실패: ", urlError);
      throw new Error("Signed URL 생성 실패");
    }

    return urlData?.signedUrl || null;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드 실패");
  }
};
