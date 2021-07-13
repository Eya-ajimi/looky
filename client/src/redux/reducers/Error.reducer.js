import  { GET_POST_ERRORS} from "../Constantes/Const.post";
//import { GET_USER_ERRORS } from "../actions/user.actions";
import { GET_USER_ERRORS} from  "../Constantes/Const.user"
const initialState = { userError: [],postError: []};

export default function ErrorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
         userError :[]
      } 
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: []
      }
    default: 
      return state;
  }
}