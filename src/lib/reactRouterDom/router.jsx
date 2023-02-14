import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../../pages/dashboard";
import { InvestmentHistory } from "../../pages/investment/history";
import { SaleHistory } from "../../pages/sale/history";
import { ForADay as InvForADay } from "../../pages/investment/forADay";
import { ForADay as SalForADay } from "../../pages/sale/forADay";
import { Add as AddInvestment } from "../../pages/investment/add/";
import { Add as AddSale } from "../../pages/sale/add";

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
        path: "investment/add",
        element: <AddInvestment />,
      },
      {
        path: "sale/history",
        element: <SaleHistory />,
      },
      {
        path: "sale/history/:date",
        element: <SalForADay />,
      },
      {
        path: "sale/add",
        element: <AddSale />,
      },
    ],
  },
]);

export default router;
