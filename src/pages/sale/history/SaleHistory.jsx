import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DateChooser } from "../../../components/dateChooser";

import { dateWiseSaleTrans } from "../../../data/dummy";

import { MyTable } from "../../../components/myTable";
import { FlexBox } from "../../../layouts/flexBox";

import { useNavigate } from "react-router-dom";

function SaleHistory() {
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  function handleRowClick(data) {
    navigate(`${location.pathname}/${data.date}`);
  }

  function handleInfinitePagination(newPage, rowsPerPage) {
    console.log(dateWiseSaleTrans.length / rowsPerPage > newPage);
  }

  return (
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <FlexBox
        csx={{
          flexDirection: "column",
          gap: 3,
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Header part */}
        <FlexBox
          csx={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h4" component={"h1"}>
              Sale history
            </Typography>
            <Typography variant="subtitle2">
              Last {dateWiseSaleTrans.length} days
            </Typography>
          </Box>

          <Box>
            <DateChooser
              label={"Search by date"}
              date={date}
              setDate={setDate}
              csx={{ mr: 2, width: "175px" }}
            />

            <Button variant="contained" startIcon={<AddIcon />}>
              Invest
            </Button>
          </Box>
        </FlexBox>
        {/* Table */}
        <MyTable
          headData={["Data", "Amount (INR)"]}
          rowsData={dateWiseSaleTrans}
          handleRowClick={handleRowClick}
          handleInfinitePagination={handleInfinitePagination}
        />
      </FlexBox>
    </FlexBox>
  );
}

export default SaleHistory;
