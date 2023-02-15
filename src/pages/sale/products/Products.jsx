import { useState } from "react";

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  Paper,
} from "@mui/material";

import { FlexBox } from "../../../layouts/flexBox";
import { StyledTableCell } from "../../../components/forADayTable/StyledTableCell";

import { saleProducts } from "../../../data/dummy";

function Products() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    // Page Content
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <Box sx={{ maxWidth: "530px", width: "100%", height: "auto" }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h5" textAlign={"center"}>
            Sale Products
          </Typography>
        </Box>
        {/* Body */}
        <Box>
          <TableContainer
            component={Paper}
            sx={{ height: "auto", width: "100%" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {saleProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((inv, index) => {
                    const values = Object.values(inv);

                    return (
                      <TableRow key={index} hover sx={{ cursor: "pointer" }}>
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
            count={saleProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </FlexBox>
  );
}

export default Products;
