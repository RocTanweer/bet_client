import App from "../../App";
import { createBrowserRouter } from "react-router-dom";

import { Login } from "../../pages/login";
import { Register } from "../../pages/register";
import { Profile } from "../../pages/profile";
import { Dashboard } from "../../pages/dashboard";
import { ExpenseHistory } from "../../pages/expense/history";
import { RevenueHistory } from "../../pages/revenue/history";
import { ForADay as ExpForADay } from "../../pages/expense/forADay";
import { ForADay as SalForADay } from "../../pages/revenue/forADay";
import { Add as AddExpense } from "../../pages/expense/add/";
import { Add as AddRevenue } from "../../pages/revenue/add";
import { Item as ExpenseItem } from "../../pages/expense/items";
import { Products as RevenueProducts } from "../../pages/revenue/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/expense/items",
        element: <ExpenseItem />,
      },
      {
        path: "expense/history",
        element: <ExpenseHistory />,
      },
      {
        path: "expense/history/:date",
        element: <ExpForADay />,
      },
      {
        path: "expense/add",
        element: <AddExpense />,
      },
      {
        path: "revenue/products",
        element: <RevenueProducts />,
      },
      {
        path: "revenue/history",
        element: <RevenueHistory />,
      },
      {
        path: "revenue/history/:date",
        element: <SalForADay />,
      },
      {
        path: "revenue/add",
        element: <AddRevenue />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
