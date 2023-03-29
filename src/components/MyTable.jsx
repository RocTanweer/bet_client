import { useState } from "react";

import {
  TableContainer,
  Table,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
  Box,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function MyTable({
  headData,
  rowsData,
  handleRowClick,
  handleInfinitePagination,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(event, newPage) {
    setPage(newPage);
    if (handleInfinitePagination) {
      handleInfinitePagination(newPage, rowsPerPage);
    }
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} sx={{ height: "auto", width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {headData.map((data, index) => (
                <StyledTableCell key={index}>{data}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rowsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, i) => {
                const values = Object.values(data);

                return (
                  <TableRow
                    key={i}
                    hover={handleRowClick && true}
                    sx={{ cursor: `${handleRowClick ? "pointer" : ""}` }}
                    onClick={() => handleRowClick && handleRowClick(data)}
                  >
                    {values.map((value, j) => (
                      <TableCell key={j}>{value}</TableCell>
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
        count={handleInfinitePagination ? -1 : rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default MyTable;
