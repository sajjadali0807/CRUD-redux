import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { allpersonApi, deleteApi } from "../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/slice/userslice";
import Createmodal from "./createmodal";
import createicon from "./icons8.png";
import Usertable from "./usertable";

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

//------END Of MUI style Components related funtions-----

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { updateInfo, isLoading } = useSelector(userSelector);

  useEffect(() => {
    dispatch(allpersonApi());
  }, []);

  const handleCreatemodal = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#444791" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
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
            style={{
              backgroundColor: "#e5dada24",
              background: "transperent",
              fontWeight: "500",
              border: "none ",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={handleCreatemodal}
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <img src={createicon} alt="logo" /> Create User
          </button>
        </Toolbar>
      </AppBar>
      <Usertable />
      <Createmodal setOpen={setOpen} open={open} />
    </>
  );
}
