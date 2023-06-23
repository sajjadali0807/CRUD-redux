import { errorToast, successToast } from "../../components/toast";
import { UserAPIService } from "../Api/apiservices";
import { createAction, deleteAction, updateAction } from "../slice/userslice";

//  This API is to add call all the person info
export function allpersonApi() {
  return async (dispatch) => {
    dispatch(updateAction({ isloading: true }));
    UserAPIService("GET", "http://192.168.2.122:9000/app/all/person")
      .then((e) => {
        console.log("hii brrooo", e);
        dispatch(
          updateAction({
            isloading: false,
            response: e.data.details,
          })
        );
      })
      .catch((e) => {
        console.log("SOME ERROR OCVCURED ALL PERSON API", e);
      });
  };
}

export function createApi(body) {
  return async (dispatch) => {
    dispatch(createAction({ isloading: true }));
    UserAPIService("POST", `http://192.168.2.122:9000/app/add/person`, body)
      .then((e) => {
        successToast("User Created Sucessfully");
        dispatch(allpersonApi());
        dispatch(
          createAction({
            isloading: false,
            response: e,
          })
        );
      })
      .catch((e) => {
        errorToast(e?.data?.message);
        dispatch(createAction({ isloading: false }));
      });
  };
}

export function deleteApi(e) {
  return async (dispatch) => {
    dispatch(deleteAction({ isloading: true, totalElements: 0 }));
    UserAPIService("DELETE", `http://192.168.2.122:9000/app/delete/person/${e}`)
      .then((e) => {
        dispatch(allpersonApi());
        successToast("User Deleted Sucessfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
