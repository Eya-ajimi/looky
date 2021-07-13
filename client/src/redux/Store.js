
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import { getPosts } from './actions/Post.action';
import { getUsers } from './actions/Users.action';
//import { logger } from 'redux-logger';
import  rootReducer from './reducers'
const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk ))
  );
  Store.dispatch(getUsers())
  Store.dispatch(getPosts())
  export default Store;