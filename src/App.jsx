import { Box } from "@mui/material";
import { Header } from "./layouts/header";
import { Sidebar } from "./layouts/sidebar";

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
    </Box>
  );
}

export default App;
