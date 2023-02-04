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

import { dataForChart } from "../../utils";
import { dateWiseInvestmentTrans, dateWiseSaleTrans } from "../../data/dummy";

import { Box } from "@mui/material";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  // Assuming passed arguments are same as fetched data
  const { labels, options, datasets } = dataForChart(
    dateWiseInvestmentTrans,
    dateWiseSaleTrans
  );

  // Making data for the chart
  const data = {
    labels: labels,
    datasets: datasets,
  };

  const chartRef = useRef(); // ref to the Line Component

  function onClick(event) {
    const elementsAtEvent = getElementsAtEvent(chartRef.current, event);

    if (elementsAtEvent.length > 0) {
      elementsAtEvent.forEach((el) => {
        if (!el.element.active) return;
        const { datasetIndex, index } = el;
        const link = data.datasets[datasetIndex].links[index];
        console.log(link);
      });
    }
  }

  return (
    <Box
      sx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Chart Shell */}
      <Box
        sx={{ height: "calc(100vh - 84px)", width: "calc(2 * (100vh - 84px))" }}
      >
        <Line
          data={data}
          options={options}
          onClick={onClick}
          ref={chartRef}
          style={{ cursor: "pointer" }}
        ></Line>
      </Box>
    </Box>
  );
}

export default Dashboard;
