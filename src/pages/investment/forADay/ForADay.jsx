import { useState } from "react";

import {
  Box,
  Typography,
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

import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

import { investmentTransForADay } from "../../../data/dummy";

function ForADay() {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main part */}
      <Box
        sx={{
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* Date wrapper */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              mr={1}
              variant="subtitle1"
              fontWeight={"bold"}
              component={"h2"}
            >
              Date
            </Typography>
            <Typography variant="subtitle2" component={"p"}>
              {dayjs(investmentTransForADay.date).format("D MMM YYYY")}
            </Typography>
          </Box>
        </Box>
        {/* BOdy */}
        <Box sx={{ width: "100%" }}>
          <TableContainer
            component={Paper}
            sx={{ height: "auto", width: "100%" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Item</StyledTableCell>
                  <StyledTableCell>Amount (INR)</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {investmentTransForADay.trans
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((inv) => (
                    <TableRow key={inv.id} hover sx={{ cursor: "pointer" }}>
                      <TableCell>{inv.id}</TableCell>
                      <TableCell>{inv.item}</TableCell>
                      <TableCell>{inv.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={investmentTransForADay.trans.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ForADay;
