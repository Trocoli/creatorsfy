import { Column, type Chart } from "@ant-design/plots";
import { Card } from "antd";

export default function GraficoPedidosPorTempo() {
  const data = [
    { letter: "A", frequency: 8167 },
    { letter: "B", frequency: 1492 },
    { letter: "C", frequency: 2782 },
    { letter: "D", frequency: 4253 },
    { letter: "E", frequency: 12702 },
    { letter: "F", frequency: 2288 },
    { letter: "G", frequency: 2015 },
    { letter: "H", frequency: 6094 },
    { letter: "I", frequency: 6966 },
    { letter: "J", frequency: 153 },
    { letter: "K", frequency: 772 },
    { letter: "L", frequency: 4025 },
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
        colorField={"#0EAF45"}
      />
    </Card>
  );
}
