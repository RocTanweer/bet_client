import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DateWiseTable } from "../../../components/dateWiseTable";
import { DateChooser } from "../../../components/dateChooser";
import { dateWiseInvestmentTrans } from "../../../data/dummy";

function InvestmentHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(event, newPage) {
    // We can use this situation to fetch another batch of data
    // console.log(dateWiseInvestmentTrans.length / rowsPerPage > newPage);
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    // Page Component
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Header part */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h4" component={"h1"}>
              Investment history
            </Typography>
            <Typography variant="subtitle2">
              Last {dateWiseInvestmentTrans.length} days
            </Typography>
          </Box>

          <Box>
            <DateChooser />

            <Button variant="contained" startIcon={<AddIcon />}>
              Invest
            </Button>
          </Box>
        </Box>
        {/* Table */}
        <DateWiseTable
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          data={dateWiseInvestmentTrans}
        />
      </Box>
    </Box>
  );
}

export default InvestmentHistory;
