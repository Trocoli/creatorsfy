import React from "react";
import { Card, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";
import { Order, StatusEnum } from "data/api/services/orderServices/types";
import LoadingSpinner from "lib/components/LoadingSpinner";
import { dateTimeFormatter } from "lib/helpers/date/dateTimeFormatter";
import { useAppDispatch, useAppSelector } from "data/api/services/hooks";
import {
  selectLimit,
  selectPage,
  setPage,
  setLimit,
} from "data/api/services/orderServices/OrderFilterSlice";

interface PedidosListagemProps {
  orders?: Order[];
  totalElements: number;
  isLoading?: boolean;
}

const columns: TableProps<Order>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>#{text.split("-")[2]}</a>,
  },
  {
    title: "Data pedido",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => dateTimeFormatter(text).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Valor",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <Typography>R${text},00</Typography>,
  },
  {
    title: "Id produto",
    dataIndex: "product",
    key: "product",
    render: (text) => <Typography>{text.split("-")[3]}</Typography>,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, order) => (
      <>
        {
          <Tag
            color={`${
              order.status === StatusEnum.APPROVED
                ? "green"
                : order.status === StatusEnum.PEDING
                ? "geekblue"
                : "volcano"
            }`}
            key={order.id}
          >
            {order.status}
          </Tag>
        }
      </>
    ),
  },
];

export default function PedidosListagem({
  orders,
  isLoading,
  totalElements,
}: PedidosListagemProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  return (
    <Card>
      {!orders && isLoading && <LoadingSpinner />}
      {!orders && !isLoading && (
        <Typography>Nenhum pedido encontrado.</Typography>
      )}
      <Table<Order>
        columns={columns}
        dataSource={orders}
        pagination={{
          current: page,
          pageSize: limit,
          total: totalElements,
          pageSizeOptions: [10, 20, 30, 40, 50],
          onChange: (page, pageSize) => {
            dispatch(setPage(page));
            dispatch(setLimit(pageSize));
          },
        }}
      />
    </Card>
  );
}
