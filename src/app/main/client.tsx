"use client";
import React, { useState } from "react";
import { getUsers } from "@/app/main/action";
import { FilterDrawer } from "@/app/main/components/FilterDrawer";
import { UserCard } from "@/app/main/components/UserCard";
import { Religion } from "@/types/religion";
import { User } from "@/types/user";
import { mainContainer } from "@/app/main/page.css";
import { FilterButton } from "@/app/main/components/FilterButton";
import { NoResult } from "@/app/main/components/NoResult";
import { INITIAL_FILTER, UserFilters } from "@/types/filter";

interface Props {
  initUsers: User[];
}

export default function ClientMainPage({ initUsers }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const [users, setUsers] = useState<User[]>(initUsers);
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
    setFilters(INITIAL_FILTER);
    const result = await getUsers(INITIAL_FILTER);
    setUsers(result.users);
    setDrawerOpen(false);
    setIsFilterActive(false);
  };

  const applyFilters = async () => {
    const result = await getUsers(filters);
    setUsers(result.users);
    setDrawerOpen(false);
    setIsFilterActive(
      JSON.stringify(filters) !== JSON.stringify(INITIAL_FILTER),
    );
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
        <NoResult />
      )}
    </div>
  );
}
