import { Card, Flex, Tag, Typography, DatePicker } from "antd";
import { useAppDispatch } from "data/api/services/hooks";
import {
  setEndDate,
  setInitialDate,
} from "data/api/services/orderServices/OrderFilterSlice";
import LoadingSpinner from "lib/components/LoadingSpinner";
import dayjs from "lib/helpers/date/config";
import { dateTimeFormatter } from "lib/helpers/date/dateTimeFormatter";
import { dateTimeParser } from "lib/helpers/date/dateTimeParser";
import { formatarValorEmReais } from "lib/helpers/stringsHelper";

interface FaturamentoTotalizadorProps {
  totalAmount: number;
  isLoading: boolean;
  initialDate?: string;
  finalDate?: string;
}

export default function FaturamentoTotalizador({
  totalAmount,
  isLoading,
  initialDate,
  finalDate,
}: FaturamentoTotalizadorProps) {
  const dispatch = useAppDispatch();

  const { RangePicker } = DatePicker;

  const initialDateFormatted = initialDate
    ? dateTimeFormatter(initialDate).format("DD/MM/YYYY")
    : "Data inicial";

  const finalDateFormatted = finalDate
    ? dateTimeFormatter(finalDate).format("DD/MM/YYYY")
    : "Data final";

  return (
    <Card>
      <Flex justify="space-between">
        {!totalAmount && isLoading && <LoadingSpinner />}
        {!totalAmount && !isLoading && (
          <Typography>Nenhum pedido encontrado.</Typography>
        )}
        <Flex
          className="max-w-50 bg-gray-200 rounded-sm border-1 border-gray-300 shadow"
          justify="center"
          vertical
          gap={"small"}
          style={{ padding: 10 }}
        >
          <Typography>Faturamento total: </Typography>
          <Tag
            className="shadow"
            color="green"
            style={{
              display: "flex",
              fontSize: "medium",
              fontWeight: "semi-bold",
              padding: 5,
              justifyContent: "center",
            }}
          >
            {" "}
            {formatarValorEmReais(totalAmount)}
          </Tag>
        </Flex>
        <Flex className="max-h-10 " vertical>
          <RangePicker
            format={"DD/MM/YYYY"}
            placeholder={[initialDateFormatted, finalDateFormatted]}
            minDate={initialDate ? dayjs(initialDate) : undefined}
            maxDate={finalDate ? dayjs(finalDate) : undefined}
            onChange={(_, dateStrings) => {
              const initial = dateTimeParser(dateStrings[0]).getIsoString();
              const final = dateTimeParser(dateStrings[1]).getIsoString();
              dispatch(setInitialDate(initial));
              dispatch(setEndDate(final));
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
