import { Column, type Chart } from "@ant-design/plots";
import { Card } from "antd";

export default function GraficoPedidosPorTempo() {
  const data = [
    { letter: "0h", frequency: 150 },
    { letter: "2h", frequency: 100 },
    { letter: "4h", frequency: 50 },
    { letter: "6h", frequency: 150 },
    { letter: "8h", frequency: 200 },
    { letter: "10h", frequency: 550 },
    { letter: "12h", frequency: 650 },
    { letter: "13h", frequency: 750 },
    { letter: "14h", frequency: 550 },
    { letter: "16", frequency: 153 },
    { letter: "18", frequency: 972 },
    { letter: "20", frequency: 550 },
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
