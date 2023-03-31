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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useFormik } from "formik";

import { DateChooser } from "../../components";
import { FlexBox } from "../../layouts";
import { expenseFormValSch } from "./lib/addExpenseYup.js";

function AddExpense() {
  const formik = useFormik({
    initialValues: {
      expenseItem: "",
      amount: "",
      payment: "",
      date: null,
      receiptImg: null,
    },
    validationSchema: expenseFormValSch,
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
          <Typography variant="h5">Add Expense</Typography>
        </Box>
        {/* Body */}
        <Box>
          <Stack gap={3} component={"form"} onSubmit={formik.handleSubmit}>
            <Box>
              <Autocomplete
                name="expenseItem"
                freeSolo
                options={["one", "two", "three"]}
                onChange={(e, value) => {
                  formik.setFieldValue("expenseItem", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Expense Item"
                    id="expenseItem"
                    name="expenseItem"
                    error={
                      formik.errors.expenseItem && formik.touched.expenseItem
                    }
                  />
                )}
              />
              <FormHelperText
                error={formik.errors.expenseItem && formik.touched.expenseItem}
              >
                {formik.errors.expenseItem &&
                  formik.touched.expenseItem &&
                  formik.errors.expenseItem}
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

export default AddExpense;
