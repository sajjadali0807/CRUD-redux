import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import { createApi } from "../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Createmodal({ setOpen, open }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  // const [formdata, setformData] = React.useState({
  //   name: "",
  //   address: " ",
  //   contact_no: "",
  //   amount: "",
  // });

  //-----This funtion is to pass the create user details from modal to api-----

  // const handleChange = (e) => {
  //   setformData({ ...formdata, [e.target.name]: e.target.value });
  // };

  // const handleCreate = () => {
  //   dispatch(createApi(formdata));
  //   setOpen(false);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      contact_no: "",
      amount: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      address: yup.string().required("Address is required"),

      contact_no: yup
        .string()
        .required("No is required")
        .min(10, "should be 10 digits")
        .max(10, "10 digits required"),
      amount: yup.string().required("Amount is required"),
    }),
    onSubmit: (res) => {
      const userDetails = {
        name: res?.name,
        address: res?.address,
        contact_no: res?.contact_no,
        amount: res?.amount,
      };

      dispatch(createApi(userDetails));
      setOpen(false);
    },
  });

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
                placeholder="Enter your Name"
                id="outlined-required"
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                helperText={formik.touched.name ? formik.errors.name : null}
                error={formik.touched.name ? formik.errors.name : null}
              />
              <TextField
                className="mt-3 user-d"
                required
                placeholder="Enter Adress"
                id="outlined-required"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.address ? formik.errors.address : null
                }
                error={formik.touched.address ? formik.errors.address : null}
              />
            </div>
            <div className="col-lg-6">
              {" "}
              <TextField
                className="mt-3 user-d"
                required
                placeholder="Enter Contact No"
                name="contact_no"
                id="outlined-required"
                label="Contact No"
                value={formik.values.contact_no}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.contact_no ? formik.errors.contact_no : null
                }
                error={
                  formik.touched.contact_no ? formik.errors.contact_no : null
                }
              />
              <TextField
                className="mt-3 user-d"
                required
                placeholder="Enter Amount"
                name="amount"
                id="outlined-required"
                label="Amount Paid"
                value={formik.values.amount}
                onChange={formik.handleChange}
                helperText={formik.touched.amount ? formik.errors.amount : null}
                error={formik.touched.amount ? formik.errors.amount : null}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Button
              sx={{ backgroundColor: "#444791" }}
              type="submit"
              onClick={formik.handleSubmit}
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
