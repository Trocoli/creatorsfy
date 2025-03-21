import dayjs from "./config";

type InputValue = string | number | Date | null | undefined;

export class PeriodoFormatter {
  private placeholder: string | undefined;

  constructor(placeholder = "") {
    this.placeholder = placeholder;
  }

  public format = (startDate: InputValue, endDate: InputValue) => {
    if (!startDate && !endDate) {
      return this.placeholder;
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) {
      return "Data cadastrada inválida";
    }

    return `${start.format("DD/MM/YYYY")} a ${end.format("DD/MM/YYYY")}`;
  };
}
