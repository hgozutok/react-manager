import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import * as texts from "../../const/productConst";
import { forwardRef, useRef, useImperativeHandle } from "react";

import { v4 as uuidv4 } from "uuid";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(null);
  const [title, setTitle] = React.useState(null);

  const handleOpen = (titletoSet, texttoSet) => {
    setText(texttoSet);
    setTitle(titletoSet);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //  setOpen(show);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  return (
    // handleOpen,
    // open,
    // setOpen,
    <div key={uuidv4()}>
      {/* <Button onClick={handleOpen}>{texts.SHARE}</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
});

export default BasicModal;
