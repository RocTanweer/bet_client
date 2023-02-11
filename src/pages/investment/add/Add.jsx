import { useState } from "react";

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
} from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import { FlexBox } from "../../../layouts/flexBox";
import { DateChooser } from "../../../components/dateChooser";

function Add() {
  const [date, setDate] = useState(null);

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
          <Stack gap={3} component={"form"}>
            <Autocomplete
              freeSolo
              options={["one", "two", "three"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Investment Item"
                  name="investmentItem"
                  id="investmentItem"
                />
              )}
            />

            <TextField
              label="Amount"
              type="number"
              name="amount"
              id="amount"
              fullWidth
            />

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="payment-label">Payment</InputLabel>
              <Select
                labelId="payment-label"
                name="payment"
                id="payment"
                label="Payment"
                fullWidth
              >
                <MenuItem value={"online"}>Online</MenuItem>
                <MenuItem value={"offline"}>Offline</MenuItem>
              </Select>
            </FormControl>

            <DateChooser
              label={"Date"}
              date={date}
              setDate={setDate}
              block={true}
              csx={{ width: "100%" }}
            />

            <label htmlFor="receiptImg">
              <input
                type="file"
                accept="image/*"
                id="receiptImg"
                name="receiptImg"
                style={{ display: "none" }}
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
