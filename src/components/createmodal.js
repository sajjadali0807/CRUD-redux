import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createApi } from "../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";

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

export default function Createmodal({ setOpen, open }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const [formdata, setformData] = React.useState({
    name: "",
    address: " ",
    contact_no: "",
    amount: "",
  });

  //-----This funtion is to pass the create user details from modal to api-----

  const handleChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    dispatch(createApi(formdata));
    setOpen(false);
  };
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <button
            type="button"
            onClick={handleClose}
            class="btn-close"
            aria-label="Close"
          ></button>

          <div className="row">
            <div className="col-lg-6">
              {" "}
              <TextField
                className="mt-3 user-d"
                required
                id="outlined-required"
                label="Name"
                name="name"
                value={formdata.name}
                onChange={handleChange}
              />
              <TextField
                className="mt-3 user-d"
                required
                id="outlined-required"
                name="address"
                label="Address"
                value={formdata.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              {" "}
              <TextField
                className="mt-3 user-d"
                required
                name="contact_no"
                id="outlined-required"
                label="Contact No"
                value={formdata.contact_no}
                onChange={handleChange}
              />
              <TextField
                className="mt-3 user-d"
                required
                name="amount"
                id="outlined-required"
                label="Amount Paid"
                value={formdata.amount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleCreate}
              className="mt-3 creater"
              variant="contained"
            >
              Create User
            </Button>
          </div>
        </Box>
      </Modal>
      {/* {isLoading ? <Loader/> : ""} */}
    </div>
  );
}
