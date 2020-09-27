import { combineReducers } from "redux";
import loginReducer from "./login/login.reducer";

const rootReducer = combineReducers({
  loginUser: loginReducer,
});

export default rootReducer;
