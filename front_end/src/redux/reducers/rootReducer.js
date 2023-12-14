import { combineReducers } from "redux";
import { userAuthReducer } from "./authReducer";
import { registrationReducer } from "./registrationReducer";

export default combineReducers({
    userAuth: userAuthReducer,
    userReg: registrationReducer
});