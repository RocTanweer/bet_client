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

import { dateWiseInvestmentTrans } from "../../data/dummy";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";

function Dashboard() {
  const dates = dateWiseInvestmentTrans.map((dit) => dit.date);
  const iData = dateWiseInvestmentTrans.map((idata) => idata.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Investment Transactions",
        data: iData,
        borderColor: purple[300],
        backgroundColor: purple[300],
        tension: 0.1,
        link: dates.map((date) => `/history/invt?date=${date}`),
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
      console.log(link);
      // window.open(link, "_black");
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
