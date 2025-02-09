"use client";
import React, { useState } from "react";
import { FilterDrawer } from "@/app/(with-gnb)/home/components/FilterDrawer";
import { UserCard } from "@/app/(with-gnb)/home/components/UserCard";
import { Religion } from "@/types/religion";
import { User } from "@/types/user";
import { mainContainer } from "@/app/(with-gnb)/home/page.css";
import { FilterButton } from "@/app/(with-gnb)/home/components/FilterButton";
import { NoResult } from "@/components/no-result/NoResult";
import { INITIAL_FILTER, UserFilters } from "@/types/filter";
import { toastError } from "@/utils/error";
import { getAllUsers } from "@/app/(with-gnb)/admin/action";

interface Props {
  initUsers: Partial<User>[];
}

export default function ClientAdminPage({ initUsers }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const [users, setUsers] = useState<Partial<User>[]>(initUsers);
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
      const result = await getAllUsers(INITIAL_FILTER);
      setUsers(result.users);
      setDrawerOpen(false);
      setIsFilterActive(false);
    } catch (e) {
      toastError(e);
    }
  };

  const applyFilters = async () => {
    try {
      const result = await getAllUsers(filters);
      setUsers(result.users);
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

      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.nickname} user={user} />)
      ) : (
        <NoResult noResultMessage="사용자를 찾을 수 없습니다." />
      )}
    </div>
  );
}
