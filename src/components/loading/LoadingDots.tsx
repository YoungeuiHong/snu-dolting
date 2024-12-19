import { dot, loaderContainer } from "@/components/loading/loading.css";

interface Props {
  loading: boolean;
}

export const LoadingDots = ({ loading }: Props) => {
  if (!loading) {
    return null;
  }

  return (
    <div className={loaderContainer}>
      <span className={dot} />
      <span className={dot} />
      <span className={dot} />
    </div>
  );
};
