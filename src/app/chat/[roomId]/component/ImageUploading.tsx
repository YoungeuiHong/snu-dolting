import {
  imageLoadingBackground,
  imageLoadingWrapper,
  loadingSpinner,
} from "@/app/chat/[roomId]/component/ImageUploading.css";

export const ImageUploading = () => {
  return (
    <div className={imageLoadingWrapper}>
      <div className={imageLoadingBackground}>
        <div className={loadingSpinner} />
      </div>
    </div>
  );
};
