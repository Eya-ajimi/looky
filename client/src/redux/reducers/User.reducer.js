import { GET_USER, UPDATE_BIO } from "../Constantes/Const.user";
import { UPLOAD_PICTURE , FOLLOW_USER , UNFOLLOW_USER } from "../Constantes/Const.user";
const initialState ={}
export default function  userReducer( state =initialState, action){
    switch(action.type){
        case GET_USER:
         return action.payload ;
         case UPLOAD_PICTURE:
             return{
                 ...state,
                 picture : action.payload ,
             } ;
             case UPDATE_BIO:
                 return{
                     ...state,
                     bio : action.payload,
                 } 
                 case FOLLOW_USER:
                    return {
                      ...state,
                      following: [action.payload.idToFollow, ...state.following],
                    };
                  case UNFOLLOW_USER:
                    return {
                      ...state,
                      following: state.following.filter(
                        (id) => id !== action.payload.idToUnfollow
                      ),
                    };
                 

        default:
        return state
    }
}