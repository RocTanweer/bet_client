import {
  Autocomplete,
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { DateChooser } from "../../../components/dateChooser";

import { useFormik } from "formik";

import { FlexBox } from "../../../layouts/flexBox";

import { saleFormValSch } from "../../../lib/yup";

function Add() {
  const formik = useFormik({
    initialValues: {
      saleItem: "",
      unit: "",
      amount: "",
      date: null,
    },
    validationSchema: saleFormValSch,
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
              <DateChooser
                label={"Date"}
                name={"date"}
                formik={formik}
                csx={{ width: "100%" }}
              />

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
