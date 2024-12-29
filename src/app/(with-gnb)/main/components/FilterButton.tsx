import Image from "next/image";
import {
  activeFilterBadge,
  filterButton,
  filterContainer,
  stickyHeader,
} from "@/app/(with-gnb)/main/components/FilterButton.css";

interface Props {
  onClick: () => void;
  isFilterActive: boolean;
}

export const FilterButton = ({ onClick, isFilterActive }: Props) => {
  return (
    <div className={stickyHeader}>
      <div className={filterContainer}>
        <button
          className={filterButton}
          onClick={onClick}
          style={{
            border: isFilterActive ? "1px solid #bdbdbd" : "none",
          }}
        >
          <Image src="/icon/filter.svg" alt="필터" width={15} height={15} />
          {isFilterActive && <div className={activeFilterBadge} />}
        </button>
      </div>
    </div>
  );
};
