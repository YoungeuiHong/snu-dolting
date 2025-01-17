import { ReligionLabels } from "@/types/religion";

export interface UserFilters {
  birthYearRange?: { min?: number; max?: number };
  remarriageIntent?: string;
  hasChildren?: string;
  heightRange?: { min?: number; max?: number };
  religion?: string[];
}

export const INITIAL_FILTER: UserFilters = {
  birthYearRange: { min: undefined, max: undefined },
  remarriageIntent: "all",
  hasChildren: "all",
  heightRange: { min: undefined, max: undefined },
  religion: Object.keys(ReligionLabels),
};
