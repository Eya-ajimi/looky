import axios from "axios"
import  { GET_USER, UPLOAD_PICTURE ,UPDATE_BIO ,FOLLOW_USER , UNFOLLOW_USER ,GET_USER_ERRORS } from '../Constantes/Const.user'
export const getUser =(uid)=>{
return (dispatch) => {
    return axios
    .get(`/api/user/${uid}`)

     .then((res)=>{
         dispatch({type: GET_USER,payload:res.data})
     })
    .catch((err)=> console.log(err))

}
 }
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`/api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`/api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

 export const updateBio = (userId, bio) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `/api/user/` + userId,
        data: { bio },
      })
        .then((res) => {
          dispatch({ type: UPDATE_BIO, payload: bio });
        })
        .catch((err) => console.log(err));
    };
  };

  
export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `/api/user/follow/${followerId}`,
      data:  {idToFollow} ,
    })
    .then(res=>console.log(res))
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: res.data });
      })
      .catch((err) => console.log(err.response));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `/api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};