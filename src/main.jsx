import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { InvestmentHistory } from "./pages/investment/history";
import { SaleHistory } from "./pages/sale/history";
import { ForADay as InvForADay } from "./pages/investment/forADay";
import { ForADay as SalForADay } from "./pages/sale/forADay";

async function saleForADayLoader({ params }) {
  return { params };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "investment/history",
        element: <InvestmentHistory />,
      },
      {
        path: "investment/history/:date",
        element: <InvForADay />,
      },
      {
        path: "sale/history",
        element: <SaleHistory />,
      },
      {
        path: "sale/history/:date",
        element: <SalForADay />,
        loader: saleForADayLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
