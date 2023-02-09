import { useState } from "react";

import {
  Box,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  Table,
  TableCell,
  tableCellClasses,
  TableBody,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function DateWiseTable({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  data,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleRowClick(date) {
    navigate(`${location.pathname}/${date}`);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ height: "auto", width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Amount (INR)</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inv) => (
                <TableRow
                  key={inv.date}
                  hover
                  sx={{ cursor: "pointer", tabIndex: "1" }}
                  onClick={() => handleRowClick(inv.date)}
                >
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default DateWiseTable;

// https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid#:~:text=What%20you%20need%20to%20do,method%20in%20your%20columns%20array.&text=In%20the%20above%20I%20am,a%20Button%20from%20Material%2Dui.&text=This%20should%20be%20the%20default%20answer.
