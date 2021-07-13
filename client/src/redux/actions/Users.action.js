import axios from "axios";
import { GET_USERS } from "../Constantes/Const.user";

export const getUsers = () => {
    return (dispatch) => {
      return axios
        .get(`/api/user/`)
        .then((res) => {
          dispatch({ type: GET_USERS, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };