import { Box, Typography } from "@mui/material";

import dayjs from "dayjs";

import { ForADayTable } from "../../../components/forADayTable";

import { FlexBox } from "../../../layouts/flexBox";

import { investmentTransForADay } from "../../../data/dummy";

import { useParams } from "react-router-dom";

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
        <ForADayTable
          data={investmentTransForADay}
          tableHeads={["ID", "Item", "Amount (INR)"]}
        />
      </Box>
    </FlexBox>
  );
}

export default ForADay;
