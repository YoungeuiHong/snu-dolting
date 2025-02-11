"use server";
import { createClient } from "@/utils/supabase/server";
import sharp from "sharp";
import { SupabaseClient } from "@supabase/supabase-js";

const processImage = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return sharp(buffer)
    .resize(650, 1080, { fit: "inside" })
    .jpeg({ quality: 80 })
    .toBuffer();
};

const uploadToBucket = async (
  supabase: SupabaseClient,
  bucketName: string,
  fileName: string,
  fileBuffer: Buffer,
) => {
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: "image/jpeg",
      cacheControl: "3600",
    });

  if (error) {
    console.error("이미지 업로드 실패: ", error);
    throw new Error("이미지 업로드 실패");
  }
};

export const uploadImage = async (
  file: File,
  fileName: string,
  bucketName: string,
) => {
  const supabase = await createClient();

  try {
    const compressedBuffer = await processImage(file);
    await uploadToBucket(supabase, bucketName, fileName, compressedBuffer);

    const { data: urlData, error: urlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 15);

    if (urlError) {
      console.error("Signed URL 생성 실패: ", urlError);
      throw new Error("Signed URL 생성 실패");
    }

    return urlData?.signedUrl || null;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드 실패");
  }
};

export const uploadPublicImage = async (
  file: File,
  fileName: string,
  bucketName: string,
) => {
  const supabase = await createClient();

  try {
    const compressedBuffer = await processImage(file);
    await uploadToBucket(supabase, bucketName, fileName, compressedBuffer);

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    if (!publicUrl) {
      console.error("Public URL 생성 실패");
      throw new Error("Public URL 생성 실패");
    }

    return publicUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드 실패");
  }
};
