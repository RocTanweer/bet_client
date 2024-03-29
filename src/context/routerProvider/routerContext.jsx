import { createBrowserRouter } from "react-router-dom";

import App from "../../App";
import {
  AddExpense,
  AddRevenue,
  Dashboard,
  DayExpenses,
  DayRevenue,
  ExpenseHistory,
  ExpenseItems,
  Login,
  Profile,
  Register,
  RevenueHistory,
  RevenueProducts,
  Investment,
} from "@/pages";

export const router = createBrowserRouter([
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
        element: <ExpenseItems />,
      },
      {
        path: "expense/history",
        element: <ExpenseHistory />,
      },
      {
        path: "expense/history/:date",
        element: <DayExpenses />,
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
        element: <DayRevenue />,
      },
      {
        path: "revenue/add",
        element: <AddRevenue />,
      },
      {
        path: "investment",
        element: <Investment />,
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
