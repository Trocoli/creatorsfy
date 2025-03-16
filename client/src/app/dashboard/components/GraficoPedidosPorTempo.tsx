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
    { letter: "M", frequency: 2406 },
    { letter: "N", frequency: 6749 },
    { letter: "O", frequency: 7507 },
    { letter: "P", frequency: 1929 },
    { letter: "Q", frequency: 95 },
    { letter: "R", frequency: 5987 },
    { letter: "S", frequency: 6327 },
    { letter: "T", frequency: 9056 },
    { letter: "U", frequency: 2758 },
    { letter: "V", frequency: 978 },
    { letter: "W", frequency: 236 },
    { letter: "X", frequency: 15 },
    { letter: "Y", frequency: 1974 },
    { letter: "Z", frequency: 74 },
  ];

  const config = {
    data,
    xField: "letter",
    yField: "frequency",
    autoFit: true,
    maxHeight: "10px",
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
              offsetY: height / 2 - 60,
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
        containerStyle={{ display: "flex", maxHeight: "calc(100vh-200)" }}
        colorField={"#0EAF45"}
      />
    </Card>
  );
}
