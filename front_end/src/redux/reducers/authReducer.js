import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "../types/type";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ?
    {
        isLoggedIn: true,
        user: user,
        invalid: false
    } : {
        isLoggedIn: false,
        user: null,
        invalidCred: false
    }

export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
                invalidCred: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                invalidCred: false
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                invalidCred: false
            };
        default: {
            return state;
        }
    }
}