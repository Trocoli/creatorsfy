import dayjs from "dayjs";

import "dayjs/locale/pt-br";

import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";

import { default as isSameOrBeforePlugin } from "dayjs/plugin/isSameOrBefore";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(isSameOrBeforePlugin);
dayjs.extend(duration);

dayjs.locale("pt-br");

export default dayjs;
