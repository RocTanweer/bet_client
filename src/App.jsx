import { Box } from "@mui/material";
import { Header } from "./layouts/header";

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
    </Box>
  );
}

export default App;
