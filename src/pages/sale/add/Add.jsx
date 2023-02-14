import {
  Autocomplete,
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useFormik } from "formik";
import * as Yup from "yup";

import { FlexBox } from "../../../layouts/flexBox";

const validationSchema = Yup.object({
  saleItem: Yup.string("Choose a sale item").required("This is required"),
  unit: Yup.number("Enter number of units sold").required("This is required"),
  amount: Yup.number("Enter sale amount").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
});

function Add() {
  const formik = useFormik({
    initialValues: {
      saleItem: "",
      unit: "",
      amount: "",
      date: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5">Add Sale</Typography>
        </Box>
        {/* Body */}
        <Box>
          <Stack gap={3} component={"form"} onSubmit={formik.handleSubmit}>
            <Box>
              <Autocomplete
                name={"saleItem"}
                freeSolo
                options={["one", "two", "three"]}
                onChange={(e, value) => {
                  formik.setFieldValue("saleItem", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"Sale Item"}
                    id={"saleItem"}
                    name={"saleItem"}
                    error={formik.errors.saleItem && formik.touched.saleItem}
                  />
                )}
              />
              <FormHelperText
                error={formik.errors.saleItem && formik.touched.saleItem}
              >
                {" "}
                {formik.errors.saleItem &&
                  formik.touched.saleItem &&
                  formik.errors.saleItem}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
                label={"Unit"}
                type={"number"}
                name={"unit"}
                id={"unit"}
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.unit && formik.touched.unit}
              />
              <FormHelperText error={formik.errors.unit && formik.touched.unit}>
                {formik.errors.unit &&
                  formik.touched.unit &&
                  formik.errors.unit}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
                label="Amount"
                type="number"
                name="amount"
                id="amount"
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.amount && formik.touched.amount}
              />
              <FormHelperText
                error={formik.errors.amount && formik.touched.amount}
              >
                {formik.errors.amount &&
                  formik.touched.amount &&
                  formik.errors.amount}
              </FormHelperText>
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="date"
                  value={formik.values.date}
                  onChange={(newValue) => {
                    formik.setFieldValue("date", newValue);
                  }}
                  id="date"
                  name="date"
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "100%" }}
                      {...params}
                      error={formik.errors.date && formik.touched.date}
                    />
                  )}
                />
              </LocalizationProvider>

              <FormHelperText error={formik.errors.date && formik.touched.date}>
                {" "}
                {formik.errors.date &&
                  formik.touched.date &&
                  formik.errors.date}
              </FormHelperText>
            </Box>

            <Button variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </FlexBox>
  );
}

export default Add;
