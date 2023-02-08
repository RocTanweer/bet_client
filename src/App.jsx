import { Box } from "@mui/material";

import { Header } from "./layouts/header";
import { Sidebar } from "./layouts/sidebar";
import { Dashboard } from "./pages/dashboard";
import { InvestmentHistory } from "./pages/investment/history";
// import { ForADay } from "./pages/investment/forADay";
import { ForADay } from "./pages/sale/forADay";
import { SaleHistory } from "./pages/sale/history";

function App() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "auto", md: "256px auto" },
        gridTemplateRows: "64px auto",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Sidebar />
      {/* <Dashboard /> */}
      {/* <InvestmentHistory /> */}
      {/* <SaleHistory /> */}
      <ForADay />
    </Box>
  );
}

export default App;
