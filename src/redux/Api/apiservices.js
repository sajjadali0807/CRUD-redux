import { BASE_URL } from "./configApiURL";
import axios from "axios";

export const UserAPIService = async (method, url, body) => {
  function userbaseurl() {
    return BASE_URL;
  }

  return await axios({
    method: method,
    baseURL: userbaseurl(),
    url: url,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    },
    data: body,
  })
    .then((e) => {
      const { data, status } = e;
      if (data.status === 200 || status === 200) {
        return {
          status: "success",
          data: data,
        };
      } else {
        return {
          status: "error",
          message: data.message,
        };
      }
    })
    .catch((e) => {
      if (e.message === "Network Error") {
        // router.push("/network-issue");
      }
    });
};
