import dayjs from "./config";

type InputFormat = "DD/MM/YYYY" | "YYYY-MM-DD" | "DDMMYYYY";

type InputValue = string | null | undefined;

type DateTimeParser<T> = (value: InputValue, format?: InputFormat) => T | null;

export const getDayJsDate: DateTimeParser<dayjs.Dayjs> = (value, format) => {
  if (!value) {
    return null;
  }

  const dayJsValue = format ? dayjs(value, format) : dayjs(value);

  if (!dayJsValue.isValid()) {
    throw new Error("Formato de data inválido.");
  }

  return dayJsValue;
};

const getJsDate: DateTimeParser<Date> = (value, format) => {
  return getDayJsDate(value, format)?.toDate() ?? null;
};

const getIsoString: DateTimeParser<string> = (value, format) => {
  return getDayJsDate(value, format)?.toISOString() ?? null;
};

const getIsoDateOnly: DateTimeParser<string> = (value, format) => {
  const dayJsDate = getDayJsDate(value, format);
  return dayJsDate?.format("YYYY-MM-DD") ?? null;
};

export const dateTimeParser = (value: InputValue, format?: InputFormat) => {
  return {
    getJsDate: () => getJsDate(value, format),
    getIsoString: () => getIsoString(value, format),
    getIsoDateOnly: () => getIsoDateOnly(value, format),
  };
};
