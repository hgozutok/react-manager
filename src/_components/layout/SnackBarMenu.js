import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SnackbarContent from "@mui/material/SnackbarContent";
import Link from "@mui/material/Link";
import { v4 as uuidv4 } from "uuid";
import { forwardRef, useRef, useImperativeHandle } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarMenu = React.forwardRef((props, ref) => {
  // ({ message, actionTitle, pageUrl }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "a",
    actionTitle: "a",
    pageUrl: "a",
  });

  const [snackbar, setSnackbar] = React.useState({
    message: "",
    actionTitle: "",
    pageUrl: "",
  }); //snackbar message

  const { vertical, horizontal, open, message, actionTitle, pageUrl } = state;
  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };
  const handleClose = (message) => {
    console.log(message);
    setState({ ...state, open: false });
  };
  useImperativeHandle(ref, () => ({
    handleClick,
    handleClose,
  }));
  const action = (
    <Button color="secondary" size="small">
      Go to cart
    </Button>
  );

  return (
    //handleClick,
    // snackbar,
    // setSnackbar,
    <Stack key={uuidv4()} spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        action={
          <Link color={"white"} href={pageUrl}>
            {actionTitle}
          </Link>
        }
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}{" "}
          <Link color={"#FFFFFF"} href={pageUrl}>
            {actionTitle}
          </Link>
        </Alert>
      </Snackbar>

      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
});

export default SnackBarMenu;
