import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

import { visuallyHidden } from "@mui/utils";
import { useCategories } from "_components/services/useCategories";
import { Typography } from "@mui/material";

//  "categoryID": 0,
//     "parentID": 0,
//     "categoryName": "string",
//     "description": "string",
//     "picture": "string"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ListCategories = () => {
  const { getCategories } = useCategories();
  const [categories, setCategories] = React.useState([]);

  const [isLoading, setIsloding] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsloding(true);
      setCategories(await getCategories());

      console.log("categories", categories);
      setIsloding(false);
    }

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories List
      </Typography>
      <div
        sx={{
          justifyContent: "flex-end",
        }}
      >
        {" "}
        <Button
          href="category/new"
          variant="contained"
          endIcon={<AddCircleIcon />}
        >
          Add New
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>categoryID</StyledTableCell>
              <StyledTableCell align="right">parentID</StyledTableCell>
              <StyledTableCell align="right">categoryName</StyledTableCell>
              <StyledTableCell align="left">description</StyledTableCell>
              <StyledTableCell align="left">Command</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row.categoryID}>
                <StyledTableCell align="right">
                  {row.categoryID}
                </StyledTableCell>
                <StyledTableCell align="right">{row.parentID}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.categoryName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <DeleteIcon />
                  <EditIcon />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
