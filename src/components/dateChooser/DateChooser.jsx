import { TextField } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateChooser({ label, date, setDate, csx }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue) => {
          setDate(dayjs(newValue));
        }}
        renderInput={(params) => (
          <TextField sx={{ ...csx }} size="small" {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default DateChooser;
