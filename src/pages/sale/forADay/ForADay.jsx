import { Box, Typography } from "@mui/material";

import dayjs from "dayjs";

import { useParams } from "react-router-dom";

import { saleTransForADay } from "../../../data/dummy";
import { FlexBox } from "../../../layouts/flexBox";

import { ForADayTable } from "../../../components/forADayTable";
import MyTable from "../../../components/myTable/MyTable";

function ForADay() {
  const { date } = useParams();

  return (
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main part */}
      <Box
        sx={{
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Header */}
        <FlexBox
          csx={{
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          {/* Date wrapper */}
          <FlexBox>
            <Typography
              mr={1}
              variant="subtitle1"
              fontWeight={"bold"}
              component={"h2"}
            >
              Date
            </Typography>
            <Typography variant="subtitle2" component={"p"}>
              {dayjs(date).format("D MMM YYYY")}
            </Typography>
          </FlexBox>
        </FlexBox>
        {/* BOdy */}
        <MyTable
          headData={["ID", "Item", "Unit", "Amount (INR)"]}
          rowsData={saleTransForADay.trans}
        />
      </Box>
    </FlexBox>
  );
}

export default ForADay;
