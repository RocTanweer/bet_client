import { useState } from "react";

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Paper,
} from "@mui/material";

import { StyledTableCell } from "./StyledTableCell.jsx";

function ForADayTable({ data, tableHeads }) {
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
              {tableHeads.map((tableHead, index) => (
                <StyledTableCell key={index}>{tableHead}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.trans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inv) => {
                const values = Object.values(inv);

                return (
                  <TableRow key={inv.id} hover sx={{ cursor: "pointer" }}>
                    {values.map((value, index) => (
                      <TableCell key={index}>{value}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.trans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ForADayTable;
