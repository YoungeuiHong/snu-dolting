import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatChatDate(dateTime: string): string {
  const date = dayjs.utc(dateTime).local();

  if (date.isToday()) {
    return date.format("A h:mm").replace("AM", "오전").replace("PM", "오후");
  }

  if (date.isYesterday()) {
    return "어제";
  }

  return date.format("YYYY.MM.DD");
}
