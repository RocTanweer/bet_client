import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DateChooser } from "../../../components/dateChooser";
import { dateWiseInvestmentTrans } from "../../../data/dummy";
import FlexBox from "../../../layouts/flexBox/FlexBox";
import MyTable from "../../../components/myTable/MyTable";
import { useNavigate } from "react-router-dom";

function InvestmentHistory() {
  const [date, setDate] = useState(null);

  const navigate = useNavigate();

  function handleRowClick(data) {
    navigate(`${location.pathname}/${data.date}`);
  }

  function handleInfinitePagination(newPage, rowsPerPage) {
    console.log(dateWiseInvestmentTrans.length / rowsPerPage > newPage);
  }

  return (
    // Page Component
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
              Investment history
            </Typography>
            <Typography variant="subtitle2">
              Last {dateWiseInvestmentTrans.length} days
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
        <MyTable
          headData={["Data", "Amount (INR)"]}
          rowsData={dateWiseInvestmentTrans}
          handleRowClick={handleRowClick}
          handleInfinitePagination={handleInfinitePagination}
        />
      </FlexBox>
    </FlexBox>
  );
}

export default InvestmentHistory;
