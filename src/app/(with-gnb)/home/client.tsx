"use client";
import { FilterButton } from "@/app/(with-gnb)/home/components/FilterButton";
import { FilterDrawer } from "@/app/(with-gnb)/home/components/FilterDrawer";
import { mainContainer } from "@/app/(with-gnb)/home/page.css";
import { getUsersQueryOption } from "@/query/users";
import { INITIAL_FILTER, UserFilters } from "@/types/filter";
import { Religion } from "@/types/religion";
import { toastError } from "@/utils/error";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserResults } from "./components/UserResults";
import { InstallGuide } from "@/components/guide/InstallGuide";

export default function ClientMainPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const [currentFilters, setCurrentFilters] = useState(INITIAL_FILTER);
  const { data: users, isLoading } = useSuspenseQuery(
    getUsersQueryOption(currentFilters),
  );
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleFilterChange = <K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReligionChange = (value: Religion) => {
    setFilters((prev) => {
      const newReligion =
        prev.religion && prev.religion.includes(value)
          ? prev.religion.filter((item) => item !== value)
          : [...(prev.religion || []), value];

      return {
        ...prev,
        religion: newReligion.length > 0 ? newReligion : undefined,
      };
    });
  };

  const initFilter = async () => {
    try {
      setFilters(INITIAL_FILTER);
      setCurrentFilters(INITIAL_FILTER);
      setDrawerOpen(false);
      setIsFilterActive(false);
    } catch (e) {
      toastError(e);
    }
  };

  const applyFilters = async () => {
    try {
      setCurrentFilters(filters);
      setDrawerOpen(false);
      setIsFilterActive(
        JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTER),
      );
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <div className={mainContainer}>
      <FilterButton
        isFilterActive={isFilterActive}
        onClick={() => setDrawerOpen(true)}
      />
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReligionChange={handleReligionChange}
        onApply={applyFilters}
        onInit={initFilter}
      />
      <UserResults isLoading={isLoading} users={users || []} />
      <InstallGuide bottom={65} />
    </div>
  );
}
