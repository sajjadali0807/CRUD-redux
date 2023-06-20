import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { allpersonApi, deleteApi } from "../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/slice/userslice";
import Createmodal from "./createmodal";

//------MUI style Components related funtions-----

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//
export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { updateInfo, isLoading } = useSelector(userSelector);

  useEffect(() => {
    dispatch(allpersonApi());
    console.log("API's response In Nav page", updateInfo);
  }, []);

  const handleCreatemodal = () => {
    setOpen(true);
  };

  //-----passing user id to API-----
  const handledelete = (e) => {
    dispatch(deleteApi(e?.person_id));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Admin Dashboard
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <button
            onClick={handleCreatemodal}
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create
          </button>
        </Toolbar>
      </AppBar>

      <table className="table">
        <thead
          style={{
            background: "black",
            color: "white",
            borderColor: "black",
            BorderStyle: "groove",
          }}
        >
          <tr>
            <th scope="col">person Id</th>
            <th scope="col">Name</th>
            <th scope="col">Contact No</th>
            <th scope="col">Address</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        {updateInfo?.map((e, i) => (
          <tbody>
            <tr>
              <td>{e?.person_id}</td>
              <td>{e?.name}</td>
              <td>{e?.contact_no}</td>
              <td>{e?.address}</td>
              <td>{e?.amount}</td>
              <td>{e?.status}</td>
              <td>
                {" "}
                <DeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={(j) => {
                    handledelete(e);
                    console.log(e?.person_id, "its ");
                  }}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <Createmodal setOpen={setOpen} open={open} />
    </>
  );
}
