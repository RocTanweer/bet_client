import { useState } from "react";

import dayjs from "dayjs";

import { Box, Button, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddIcon from "@mui/icons-material/Add";

import { dateWiseInvestmentTrans } from "../../../data/dummy";
import { Directions } from "@mui/icons-material";

function InvT() {
  const [date, setDate] = useState(null);

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
            <Typography>23-01-22 to 23-01-31</Typography>
          </Box>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Search by date"
                value={date}
                onChange={(newValue) => {
                  setDate(dayjs(newValue));
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ mr: 2, width: "175px" }}
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>

            <Button variant="contained" startIcon={<AddIcon />}>
              Invest
            </Button>
          </Box>
        </Box>
        {/* Table */}
        <Box>Body </Box>
      </Box>
    </Box>
  );
}

export default InvT;
