import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatLocalTime = (
  dateString: string | null,
  template: string,
): string => {
  if (!dateString) {
    return "";
  }

  return dayjs.utc(dateString).local().format(template);
};
