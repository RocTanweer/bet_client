import { useRef } from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, getElementsAtEvent } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import { Box } from "@mui/material";

function Dashboard() {
  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 33, 66],
        borderColor: "aqua",
        backgroundColor: "aqua",
        tension: 0.4,
        link: [
          "https://www.chartjs.org",
          "https://www.chartjs3.com",
          "https://www.google.com",
        ],
      },
    ],
  };

  const options = {};

  const chartRef = useRef();

  function onClick(event) {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      // console.log(getElementsAtEvent(chartRef.current, event));
      const clickDatasetIndex = getElementsAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      // console.log(clickDatasetIndex);
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
      // console.log(dataPoint);
      const link = data.datasets[clickDatasetIndex].link[dataPoint];
      window.open(link, "_black");
    }
  }

  return (
    <Box
      sx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
      }}
    >
      {/* Chart Shell */}
      <Box>
        <Line
          data={data}
          options={options}
          onClick={onClick}
          ref={chartRef}
        ></Line>
      </Box>
    </Box>
  );
}

export default Dashboard;
