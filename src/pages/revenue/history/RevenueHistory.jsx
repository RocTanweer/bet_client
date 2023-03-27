import { Box, Button, Typography } from "@mui/material";

import { DateChooser } from "../../../components/dateChooser";

import { dateWiseRevenueTrans } from "../../../data/dummy";

import { MyTable } from "../../../components/myTable";
import { FlexBox } from "../../../layouts/flexBox";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { historyFormValSch } from "../../../lib/yup/validationSchemas";

function RevenueHistory() {
  const formik = useFormik({
    initialValues: {
      date: null,
    },
    validationSchema: historyFormValSch,
    onSubmit: (values) => console.log(values),
  });

  const navigate = useNavigate();

  function handleRowClick(data) {
    navigate(`${location.pathname}/${data.date}`);
  }

  function handleInfinitePagination(newPage, rowsPerPage) {
    console.log(dateWiseRevenueTrans.length / rowsPerPage > newPage);
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
              Revenue history
            </Typography>
            <Typography variant="subtitle2">
              Last {dateWiseRevenueTrans.length} days
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

            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>
        </FlexBox>
        {/* Table */}
        <MyTable
          headData={["Data", "Amount (INR)"]}
          rowsData={dateWiseRevenueTrans}
          handleRowClick={handleRowClick}
          handleInfinitePagination={handleInfinitePagination}
        />
      </FlexBox>
    </FlexBox>
  );
}

export default RevenueHistory;
