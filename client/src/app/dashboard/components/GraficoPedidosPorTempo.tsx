import { Column, type Chart } from "@ant-design/plots";
import { Card } from "antd";
import { OrdersByHour } from "data/api/services/orderServices/types";

interface GraficoPedidosPorTempoProps {
  ordersByHour: OrdersByHour[];
}

export default function GraficoPedidosPorTempo({
  ordersByHour,
}: GraficoPedidosPorTempoProps) {
  const data = ordersByHour;

  const config = {
    data,
    xField: "hour",
    yField: "totalOrders",
    autoFit: true,
    onReady: ({ chart }: Chart) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          "afterrender",
          () => {
            chart.emit("tooltip:show", {
              data: {
                data: { tooltipItem },
              },
              offsetY: height / 2 - 600,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <Card variant="outlined">
      <Column
        {...Column}
        {...config}
        containerStyle={{ display: "flex" }}
        title={"Pedidos Por Hora"}
        className={"max-h-85"}
        colorField={"#468189"} // --blue-teal
      />
    </Card>
  );
}
