import { REGISTER_FAILED, REGISTER_SUCCESS } from "../types/type";

const initialState = {
    userCreated: false,
    errors: {}
};

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userCreated: true,
                errors: {}
            }
        case REGISTER_FAILED:
            return {
                ...state,
                userCreated: true,
                errors: action.data
            }
        default:
            return state;
    }
}