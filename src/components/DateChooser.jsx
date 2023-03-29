import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateChooser({ label, formik, name, csx, size }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        name={name}
        id={name}
        value={formik.values.date}
        onChange={(newValue) => {
          formik.setFieldValue("date", newValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={{ ...csx }}
            size={size && size}
            {...params}
            error={formik.errors.date && formik.touched.date}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateChooser;
