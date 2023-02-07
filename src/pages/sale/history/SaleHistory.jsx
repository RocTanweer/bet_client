import { Box } from "@mui/material";

function SaleHistory() {
  return (
    <Box
      sx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      Sale Transactions
    </Box>
  );
}

export default SaleHistory;
