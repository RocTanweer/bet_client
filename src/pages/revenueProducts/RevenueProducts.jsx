import { Box, Typography } from "@mui/material";

import { FlexBox } from "@/layouts";
import { revenueProducts } from "@/data/dummy";
import { MyTable } from "@/components";

function RevenueProducts() {
  function handleRowClick(data) {
    console.log(data);
  }

  return (
    // Page Content
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <Box sx={{ maxWidth: "530px", width: "100%", height: "auto" }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h5" textAlign={"center"}>
            Revenue Products
          </Typography>
        </Box>
        {/* Body */}
        <MyTable
          headData={["Name", "Price"]}
          rowsData={revenueProducts}
          handleRowClick={handleRowClick}
        />
      </Box>
    </FlexBox>
  );
}

export default RevenueProducts;
