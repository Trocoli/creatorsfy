import { Column, type Chart } from "@ant-design/plots";
import { Card } from "antd";

export default function GraficoPedidosPorTempo() {
  const data = [
    { time: "0h", amount: 150 },
    { time: "2h", amount: 100 },
    { time: "4h", amount: 50 },
    { time: "6h", amount: 150 },
    { time: "8h", amount: 200 },
    { time: "10h", amount: 550 },
    { time: "12h", amount: 650 },
    { time: "13h", amount: 750 },
    { time: "14h", amount: 550 },
    { time: "16", amount: 153 },
    { time: "18", amount: 972 },
    { time: "20", amount: 550 },
  ];

  const config = {
    data,
    xField: "letter",
    yField: "frequency",
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
                data: tooltipItem,
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
        className={"max-h-70"}
        colorField={"#468189"} // --blue-teal
      />
    </Card>
  );
}
