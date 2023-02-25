import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import GlobalContextProvider from "./context/GlobalContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalContextProvider />
  </React.StrictMode>
);
