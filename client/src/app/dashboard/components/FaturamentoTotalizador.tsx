import { Card, Flex, Tag, Typography } from "antd";

export default function FaturamentoTotalizador() {
  return (
    <Card>
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
          R$10.000,00
        </Tag>
      </Flex>
    </Card>
  );
}
