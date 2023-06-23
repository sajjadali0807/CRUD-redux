import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteApi } from "../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/slice/userslice";
import createicon from "./icons8.png";

export default function Usertable() {
  const dispatch = useDispatch();
  const { updateInfo, isLoading } = useSelector(userSelector);

  //-----passing user id to API-----
  const handledelete = (e) => {
    dispatch(deleteApi(e?.person_id));
  };

  return (
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
                className="mx-3"
                sx={{ cursor: "pointer" }}
                onClick={(j) => {
                  handledelete(e);
                  // console.log(e?.person_id, "its ");
                }}
              />
              <img
                style={{ cursor: "pointer" }}
                src={createicon}
                alt="createlogo"
                onClick={(k) => {
                  // console.log("this is edit logo", e?.person_id);
                }}
              />
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
