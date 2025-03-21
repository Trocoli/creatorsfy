import { toTitleCase } from "../stringsHelper";
import dayjs from "./config";

type InputValue = string | number | Date | null;

const getMonthsOfYear = (args?: { startBy?: 0 | 1; titleCase?: boolean }) => {
  const init = args?.startBy ?? 0;

  return dayjs
    .localeData()
    .months()
    .map((m, i) => ({
      label: args?.titleCase ? toTitleCase(m) : m,
      value: i + init,
    }));
};

const isBefore = (firstDate: InputValue, lastDate: InputValue) => {
  return dayjs(firstDate).isBefore(dayjs(lastDate));
};

const isSameOrBefore = (firstDate: InputValue, lastDate: InputValue) => {
  return dayjs(firstDate).isSameOrBefore(dayjs(lastDate));
};

const isDurationInsideLimit = (
  start: InputValue,
  daysPassed: number,
  yearsLimit: number
) => {
  const datePlusDays = dayjs(start).add(daysPassed, "day");
  const datePlusYears = dayjs(start).add(yearsLimit, "year");

  return datePlusDays.isSameOrBefore(datePlusYears);
};

const getToday = () => {
  const now = dayjs();
  const date =
    now.get("year") + "/" + (now.get("month") + 1) + "/" + now.get("day");
  return date;
};

export const DateTimeUtil = {
  getMonthsOfYear,
  isBefore,
  isSameOrBefore,
  isDurationInsideLimit,
  getToday,
  getDateNow: () => dayjs().toDate(),
  get24HoursBefore: () => dayjs().subtract(1, "day").toDate(),
  get24HoursLater: () => dayjs().add(1, "day").toDate(),
};
