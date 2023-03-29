import { Box, Button, Typography } from "@mui/material";

import { DateChooser } from "../../components";
import { dateWiseExpenseTrans } from "../../data/dummy";
import { FlexBox } from "../../layouts";
import { MyTable } from "../../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { revenueFormValSch } from "../../lib/yupValidationSchemas";

function ExpenseHistory() {
  const formik = useFormik({
    initialValues: {
      date: null,
    },
    validationSchema: revenueFormValSch,
    onSubmit: (values) => console.log(values),
  });

  const navigate = useNavigate();

  function handleRowClick(data) {
    navigate(`${location.pathname}/${data.date}`);
  }

  function handleInfinitePagination(newPage, rowsPerPage) {
    console.log(dateWiseExpenseTrans.length / rowsPerPage > newPage);
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
              Expense history
            </Typography>
            <Typography variant="subtitle2">
              Last {dateWiseExpenseTrans.length} days
            </Typography>
          </Box>

          <Box component={"form"} onSubmit={formik.handleSubmit}>
            <DateChooser
              label={"Search by date"}
              name={"date"}
              formik={formik}
              csx={{ mr: 2, width: "175px" }}
              size={"small"}
            />

            <Button variant="contained" type="submit">
              Search
            </Button>
          </Box>
        </FlexBox>
        <MyTable
          headData={["Data", "Amount (INR)"]}
          rowsData={dateWiseExpenseTrans}
          handleRowClick={handleRowClick}
          handleInfinitePagination={handleInfinitePagination}
        />
      </FlexBox>
    </FlexBox>
  );
}

export default ExpenseHistory;
