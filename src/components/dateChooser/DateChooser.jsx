import { useState } from "react";

import { TextField } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateChooser() {
  const [date, setDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Search by date"
        value={date}
        onChange={(newValue) => {
          setDate(dayjs(newValue));
        }}
        renderInput={(params) => (
          <TextField sx={{ mr: 2, width: "175px" }} size="small" {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateChooser;
