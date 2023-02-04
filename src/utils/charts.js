import { purple, cyan } from "@mui/material/colors";

export function dataForChart(dateWiseInvestmentTrans, dateWiseSaleTrans) {
  const labels = dateWiseInvestmentTrans.map((trans) => trans.date);
  const data1 = dateWiseInvestmentTrans.map((trans) => trans.amount);
  const data2 = dateWiseSaleTrans.map((trans) => trans.amount);
  const options = {};

  return {
    labels,
    options,
    datasets: [
      {
        label: "Investment Transactions",
        data: data1,
        borderColor: purple[300],
        backgroundColor: purple[300],
        tension: 0.1,
        links: labels.map((date) => `/history/invt?date=${date}`),
      },
      {
        label: "Sales",
        data: data2,
        borderColor: cyan[300],
        backgroundColor: cyan[300],
        tension: 0.1,
        links: labels.map((date) => `/history/salt?date=${date}`),
      },
    ],
  };
}
