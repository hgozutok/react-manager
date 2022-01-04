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

import { Typography } from "@mui/material";

import { forwardRef, useRef, useImperativeHandle } from "react";
import SnackBarMenu from "../../../_components/layout/SnackBarMenu";
import BasicModal from "_components/layout/basicModal";
import Skeleton from "@mui/material/Skeleton";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "_components/services/useCompanies";

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

export const ListCompanies = () => {
  const navigation = useNavigate();
  const { getCompanies } = useCompanies();
  const [companies, setCompanies] = React.useState([]);

  const modalRef = useRef();
  const snackBarRef = useRef();

  const [isLoading, setIsloding] = React.useState(false);

  const [snackbar, setSnackbar] = useState({
    //snackbar state
    vertical: "top",
    horizontal: "right",
    message: "Company edited",
    actionTitle: "View ",
    pageUrl: "/dashboard/companies",
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
    return await getCompanies();
  };
  React.useEffect(() => {
    setIsloding(true);
    fetchData().then((res) => {
      setCompanies(res);
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
        Company List
      </Typography>
      <div
        sx={{
          justifyContent: "flex-end",
        }}
      >
        {" "}
        <Button
          href="company/new"
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
              <StyledTableCell align="left">CID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Adress</StyledTableCell>
              <StyledTableCell align="left">Country</StyledTableCell>
              <StyledTableCell align="left">currency</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row) => (
              <StyledTableRow key={row.companyID}>
                <StyledTableCell align="left">
                  {row.companyName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.adress}</StyledTableCell>
                <StyledTableCell align="left">{row.country}</StyledTableCell>
                <StyledTableCell align="left">{row.currency}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <DeleteIcon onClick={openPopup} />
                  <EditIcon
                    onClick={() =>
                      navigation(`/dashboard/company/edit/${row.companyID}`)
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

export default ListCompanies;
