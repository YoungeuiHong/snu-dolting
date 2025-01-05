import { Drawer } from "@/components/drawer";
import {
  applyButton,
  buttonContainer,
  checkboxInput,
  checkboxLabel,
  filterTitle,
  initButton,
  numberInput,
  radioContainer,
  radioInput,
  radioLabel,
  rangeContainer,
  rangeIndicator,
} from "@/app/(with-gnb)/home/components/FilterDrawer.css";
import { Religion, ReligionLabels } from "@/types/religion";
import { UserFilters } from "@/types/filter";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: UserFilters;
  onFilterChange: <K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K],
  ) => void;
  onReligionChange: (value: Religion) => void;
  onApply: () => void;
  onInit: () => void;
}

export const FilterDrawer = ({
  open,
  onClose,
  filters,
  onFilterChange,
  onReligionChange,
  onApply,
  onInit,
}: FilterDrawerProps) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <div style={{ padding: "20px" }}>
        <h3>필터 설정</h3>
        <div>
          <p className={filterTitle}>출생년도</p>
          <div className={rangeContainer}>
            <input
              type="number"
              placeholder="최소"
              value={filters?.birthYearRange?.min || ""}
              onChange={(e) =>
                onFilterChange("birthYearRange", {
                  ...filters?.birthYearRange,
                  min: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={numberInput}
            />
            <span className={rangeIndicator}>-</span>
            <input
              type="number"
              placeholder="최대"
              value={filters?.birthYearRange?.max || ""}
              onChange={(e) =>
                onFilterChange("birthYearRange", {
                  ...filters?.birthYearRange,
                  max: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={numberInput}
            />
          </div>
        </div>
        <div>
          <p className={filterTitle}>키</p>
          <div className={rangeContainer}>
            <input
              type="number"
              placeholder="최소"
              value={filters?.heightRange?.min || ""}
              onChange={(e) =>
                onFilterChange("heightRange", {
                  ...filters?.heightRange,
                  min: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={numberInput}
            />
            <span className={rangeIndicator}>-</span>

            <input
              type="number"
              placeholder="최대"
              value={filters?.heightRange?.max || ""}
              onChange={(e) =>
                onFilterChange("heightRange", {
                  ...filters?.heightRange,
                  max: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className={numberInput}
            />
          </div>
        </div>
        <div>
          <p className={filterTitle}>재혼 의향</p>
          <div className={radioContainer}>
            <label className={radioLabel}>
              <input
                type="radio"
                name="remarriageIntent"
                value=""
                checked={filters?.remarriageIntent === "all"}
                onChange={() => onFilterChange("remarriageIntent", "all")}
                className={radioInput}
              />
              <span>전체</span>
            </label>
            <label className={radioLabel}>
              <input
                type="radio"
                name="remarriageIntent"
                value="true"
                checked={filters?.remarriageIntent === "true"}
                onChange={() => onFilterChange("remarriageIntent", "true")}
                className={radioInput}
              />
              <span>있음</span>
            </label>
            <label className={radioLabel}>
              <input
                type="radio"
                name="remarriageIntent"
                value="false"
                checked={filters?.remarriageIntent === "false"}
                onChange={() => onFilterChange("remarriageIntent", "false")}
                className={radioInput}
              />
              <span>없음</span>
            </label>
          </div>
        </div>
        <div>
          <p className={filterTitle}>자녀 유무</p>
          <div className={radioContainer}>
            <label className={radioLabel}>
              <input
                type="radio"
                name="hasChildren"
                value=""
                checked={filters?.hasChildren === "all"}
                onChange={() => onFilterChange("hasChildren", "all")}
                className={radioInput}
              />
              전체
            </label>
            <label className={radioLabel}>
              <input
                type="radio"
                name="hasChildren"
                value="true"
                checked={filters?.hasChildren === "true"}
                onChange={() => onFilterChange("hasChildren", "true")}
                className={radioInput}
              />
              있음
            </label>
            <label className={radioLabel}>
              <input
                type="radio"
                name="hasChildren"
                value="false"
                checked={filters?.hasChildren === "false"}
                onChange={() => onFilterChange("hasChildren", "false")}
                className={radioInput}
              />
              없음
            </label>
          </div>
        </div>
        <div>
          <p className={filterTitle}>종교</p>
          <div className={radioContainer}>
            {Object.entries(ReligionLabels).map(([value, label]) => (
              <label key={value} className={checkboxLabel}>
                <input
                  type="checkbox"
                  value={value}
                  checked={filters?.religion?.includes(value) || false}
                  onChange={() => onReligionChange(value as Religion)}
                  className={checkboxInput}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className={buttonContainer}>
          <button onClick={onInit} className={initButton}>
            초기화
          </button>
          <button onClick={onApply} className={applyButton} style={{ flex: 1 }}>
            적용하기
          </button>
        </div>
      </div>
    </Drawer>
  );
};
