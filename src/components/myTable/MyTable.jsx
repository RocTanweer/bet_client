import {
  TableContainer,
  Table,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";

import { StyledTableCell } from "./StyledTableCell";

function MyTable({
  headData,
  rowsData,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleRowClick,
  infinitePagination,
}) {
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
                    onClick={handleRowClick}
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
        count={infinitePagination ? -1 : rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default MyTable;
