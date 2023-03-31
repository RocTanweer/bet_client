import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

import { FlexBox } from "../../layouts";
import { MyTable } from "../../components";
import { expenseTransForADay } from "../../data/dummy";

function DayExpenses() {
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
          headData={["ID", "Item", "Amount (INR)"]}
          rowsData={expenseTransForADay.trans}
        />
      </Box>
    </FlexBox>
  );
}

export default DayExpenses;
