import { purple, cyan } from "@mui/material/colors";

/**
 * @description This takes two array of objects, which are dummy data for now, and returns data for the chart
 * @param {object[]} dateWiseExpenseTrans
 * @param {object[]} dateWiseRevenueTrans
 * @returns {object}
 */
export function dataForChart(dateWiseExpenseTrans, dateWiseRevenueTrans) {
  const labels = dateWiseExpenseTrans.map((trans) => trans.date);
  const data1 = dateWiseExpenseTrans.map((trans) => trans.amount);
  const data2 = dateWiseRevenueTrans.map((trans) => trans.amount);
  const options = {};

  return {
    labels,
    options,
    datasets: [
      {
        label: "Expense",
        data: data1,
        borderColor: purple[300],
        backgroundColor: purple[300],
        tension: 0.1,
        links: labels.map((date) => `/expense/history/${date}`),
      },
      {
        label: "Revenue",
        data: data2,
        borderColor: cyan[300],
        backgroundColor: cyan[300],
        tension: 0.1,
        links: labels.map((date) => `/revenue/history/${date}`),
      },
    ],
  };
}
