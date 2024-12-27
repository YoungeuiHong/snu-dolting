import { ReligionLabels } from "@/types/religion";

export interface UserFilters {
  gender?: string;
  birthYearRange?: { min?: number; max?: number };
  remarriageIntent?: string;
  hasChildren?: string;
  heightRange?: { min?: number; max?: number };
  isSnuGraduate?: boolean;
  photoExchangeIntent?: boolean;
  religion?: string[];
}

export const INITIAL_FILTER: UserFilters = {
  gender: "",
  birthYearRange: { min: undefined, max: undefined },
  remarriageIntent: "all",
  hasChildren: "all",
  heightRange: { min: undefined, max: undefined },
  isSnuGraduate: undefined,
  photoExchangeIntent: undefined,
  religion: Object.keys(ReligionLabels),
};
