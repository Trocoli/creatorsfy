import { Card, Flex, Tag, Typography, DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker/generatePicker/interface";
import { useAppDispatch } from "data/api/services/hooks";
import {
  setEndDate,
  setInitialDate,
} from "data/api/services/orderServices/OrderFilterSlice";
import LoadingSpinner from "lib/components/LoadingSpinner";
import dayjs from "lib/helpers/date/config";
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

  const onOK = (value: RangePickerProps["value"]) => {
    console.log(value);
  };

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
            defaultValue={[
              initialDate ? dayjs(initialDate) : undefined,
              finalDate ? dayjs(finalDate) : undefined,
            ]}
            minDate={initialDate ? dayjs(initialDate) : undefined}
            maxDate={finalDate ? dayjs(finalDate) : undefined}
            onChange={(_, dateStrings) => {
              console.log(dateStrings);
              const initial = dateTimeParser(
                dateStrings[0],
                "DD/MM/YYYY"
              ).getIsoString();
              const final = dateTimeParser(
                dateStrings[1],
                "DD/MM/YYYY"
              ).getIsoString();
              dispatch(setInitialDate(initial ? initial : undefined));
              dispatch(setEndDate(final ? final : undefined));
            }}
            onOk={onOK}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
