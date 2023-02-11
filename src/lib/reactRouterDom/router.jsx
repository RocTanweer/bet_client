import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../../pages/dashboard";
import { InvestmentHistory } from "../../pages/investment/history";
import { SaleHistory } from "../../pages/sale/history";
import { ForADay as InvForADay } from "../../pages/investment/forADay";
import { ForADay as SalForADay } from "../../pages/sale/forADay";
import Add from "../../pages/investment/add/Add";

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
        element: <Add />,
      },
      {
        path: "sale/history",
        element: <SaleHistory />,
      },
      {
        path: "sale/history/:date",
        element: <SalForADay />,
      },
    ],
  },
]);

export default router;
