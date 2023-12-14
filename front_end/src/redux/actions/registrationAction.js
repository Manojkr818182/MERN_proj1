import { REGISTER } from "../types/type";

export const registerAction = (user_data) => {
    return {
        type: REGISTER,
        data: user_data
    };
};