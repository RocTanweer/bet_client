import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import { MyRouterProvider } from "./context/reactRouterDom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <MyRouterProvider />
  </React.StrictMode>
);
