import dayjs from "./config.ts";

export type RawDateValue = string | number | Date | null | undefined;
export type FormattedDateTime =
  | "DD/MM/YYYY"
  | "DD/MM/YYYY - HH:mm"
  | "YYYY-MM-DD";

export const dateTimeFormatter = (value: RawDateValue) => {
  const format = (outputFormat: FormattedDateTime, placeholder = "") => {
    if (!value) {
      return placeholder;
    }

    const dayJsValue = dayjs(value);

    if (!dayJsValue.isValid()) {
      return placeholder;
    }

    return dayJsValue.format(outputFormat);
  };

  return { format };
};
