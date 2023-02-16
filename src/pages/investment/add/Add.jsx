import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  FormHelperText,
} from "@mui/material";

import { DateChooser } from "../../../components/dateChooser";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import { useFormik } from "formik";
import * as Yup from "yup";

import { FlexBox } from "../../../layouts/flexBox";

const FILE_SIZE = 262144000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
  investmentItem: Yup.string("Choose an investment item").required(
    "This is required!"
  ),
  amount: Yup.number("Enter amount invested").required("This is required"),
  payment: Yup.string("Choose payment method").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
  receiptImg: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      (value) => value === null || value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) => value === null || SUPPORTED_FORMATS.includes(value.type)
    )
    .notRequired(),
});

function Add() {
  const formik = useFormik({
    initialValues: {
      investmentItem: "",
      amount: "",
      payment: "",
      date: null,
      receiptImg: null,
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
          <Typography variant="h5">Add Investment</Typography>
        </Box>
        {/* Body */}
        <Box>
          <Stack gap={3} component={"form"} onSubmit={formik.handleSubmit}>
            <Box>
              <Autocomplete
                name="investmentItem"
                freeSolo
                options={["one", "two", "three"]}
                onChange={(e, value) => {
                  formik.setFieldValue("investmentItem", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Investment Item"
                    id="investmentItem"
                    name="investmentItem"
                    error={
                      formik.errors.investmentItem &&
                      formik.touched.investmentItem
                    }
                  />
                )}
              />
              <FormHelperText
                error={
                  formik.errors.investmentItem && formik.touched.investmentItem
                }
              >
                {formik.errors.investmentItem &&
                  formik.touched.investmentItem &&
                  formik.errors.investmentItem}
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

            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                error={formik.errors.payment && formik.touched.payment}
                id="payment-label"
              >
                Payment
              </InputLabel>
              <Select
                labelId="payment-label"
                name="payment"
                id="payment"
                label="Payment"
                fullWidth
                value={formik.values.payment}
                onChange={formik.handleChange}
                error={formik.errors.payment && formik.touched.payment}
              >
                <MenuItem value={"online"}>Online</MenuItem>
                <MenuItem value={"offline"}>Offline</MenuItem>
              </Select>{" "}
              <FormHelperText
                error={formik.errors.payment && formik.touched.payment}
              >
                {formik.errors.payment &&
                  formik.touched.payment &&
                  formik.errors.payment}
              </FormHelperText>
            </FormControl>

            <Box>
              <DateChooser
                label={"Date"}
                name={"date"}
                formik={formik}
                csx={{ width: "100%" }}
              />

              <FormHelperText error={formik.errors.date && formik.touched.date}>
                {formik.errors.date &&
                  formik.touched.date &&
                  formik.errors.date}
              </FormHelperText>
            </Box>

            <label htmlFor="receiptImg">
              <input
                type="file"
                accept="image/*"
                id="receiptImg"
                name="receiptImg"
                style={{ display: "none" }}
                onChange={(e) => {
                  formik.setFieldValue("receiptImg", e.target.files[0]);
                }}
              />
              <Button
                component="span"
                aria-label="add"
                variant="outlined"
                fullWidth
                startIcon={<FileUploadIcon />}
              >
                Upload Receipt
              </Button>
              <FormHelperText variant="h7">
                {formik.values.receiptImg && formik.values.receiptImg.name}
              </FormHelperText>
            </label>
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
