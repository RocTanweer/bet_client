import { Box } from "@mui/material";

import { dateWiseInvestmentTrans } from "../../../data/dummy";

function InvT() {
  return (
    <Box
      sx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {dateWiseInvestmentTrans.map((inv, i) => (
        <code key={i} style={{ margin: "20px" }}>
          <span>{inv.date}</span> <span>{inv.amount}</span>
        </code>
      ))}
    </Box>
  );
}

export default InvT;
