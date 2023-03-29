import { Box, Typography, Divider } from "@mui/material";

import { Nav } from "../components";

function Sidebar() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "256px",
        height: "100vh",
      }}
    >
      <Typography variant="h3" textAlign={"center"} py={"4px"}>
        BET
      </Typography>

      <Divider />

      <Nav />
    </Box>
  );
}

export default Sidebar;
