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

import { dateWiseInvestmentTrans } from "../../../data/dummy";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function InvTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(event, newPage) {
    // We can use this situation to fetch another batch of data
    // console.log(dateWiseInvestmentTrans.length / rowsPerPage > newPage);
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            {dateWiseInvestmentTrans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inv) => (
                <TableRow
                  key={inv.date}
                  hover
                  sx={{ cursor: "pointer", tabIndex: "1" }}
                  onClick={() => console.log(inv.date)}
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
        // count={dateWiseInvestmentTrans.length}
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default InvTable;

// https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid#:~:text=What%20you%20need%20to%20do,method%20in%20your%20columns%20array.&text=In%20the%20above%20I%20am,a%20Button%20from%20Material%2Dui.&text=This%20should%20be%20the%20default%20answer.
