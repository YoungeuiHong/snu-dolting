import { LoadingDots } from "@/components/loading/LoadingDots";
import { pageContainer } from "@/components/loading/loading.css";

interface Props {
  loading: boolean;
}

export const PageLoader = ({ loading }: Props) => {
  return (
    <div className={pageContainer}>
      <LoadingDots loading={loading} />
    </div>
  );
};
