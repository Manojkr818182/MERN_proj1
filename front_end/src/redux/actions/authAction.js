import {
    LOGIN,
    LOGOUT
} from "../types/type";

export const loginFun = (user_data) => {
    return {
        type: LOGIN,
        data: user_data
    };
};

export const logoutFun = () => {
    return {
        type: LOGOUT,
        data: null
    };
};