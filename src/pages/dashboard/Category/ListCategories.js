import React, { useState } from "react";
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

import { forwardRef, useRef, useImperativeHandle } from "react";
import SnackBarMenu from "../../../_components/layout/SnackBarMenu";
import BasicModal from "_components/layout/basicModal";
import Skeleton from "@mui/material/Skeleton";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
  const { getCategories } = useCategories();
  const [categories, setCategories] = React.useState([]);

  const [isLoading, setIsloding] = React.useState(false);

  const modalRef = useRef();
  const snackBarRef = useRef();

  //const [showModal, setShowModal] = useState(false); //modal show
  //const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    //snackbar state
    vertical: "top",
    horizontal: "right",
    message: "Category edited",
    actionTitle: "View ",
    pageUrl: "/dashboard/categories",
  }); //snackbar message

  const openSnack = () => {
    snackBarRef.current.handleClick(snackbar);
  };

  const openPopup = () => {
    modalRef.current.handleOpen(
      "Delete",
      "Are you sure you want to delete this category?"
    );
  };
  const fetchData = async () => {
    // setIsloding(true);
    return await getCategories();
  };
  React.useEffect(() => {
    setIsloding(true);
    fetchData().then((res) => {
      setCategories(res);
      // console.log("categories", res);
      setIsloding(false);
    });
  }, []);

  return isLoading ? (
    <div>
      <Skeleton animation="wave" variant="rect" height={40} />
    </div>
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

      <TableContainer
        sx={{ margin: "5rem,5rem,5rem,5rem", padding: "5rem" }}
        component={Paper}
      >
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>categoryID</StyledTableCell>
              <StyledTableCell align="left">PID</StyledTableCell>
              <StyledTableCell align="left">categoryName</StyledTableCell>
              <StyledTableCell align="left">description</StyledTableCell>
              <StyledTableCell align="left">Command</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row.categoryID}>
                <StyledTableCell align="left">{row.categoryID}</StyledTableCell>
                <StyledTableCell align="left">{row.parentID}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.categoryName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <DeleteIcon onClick={openPopup} />
                  <EditIcon
                    onClick={() =>
                      navigation(`/dashboard/category/edit/${row.categoryID}`)
                    }
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackBarMenu ref={snackBarRef} />
      <BasicModal ref={modalRef} />
    </div>
  );
};
