import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "../types/type";
import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import Swal from "sweetalert2";


function* loginFun(action) {
    const res = yield axios.post('http://192.168.0.110:6060/api/login', action.data);
    if (res.data.code === 1) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        yield put({ type: LOGIN_SUCCESS, data: res.data.data });
        Swal.fire({
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1000
        });
    } else {
        yield put({ type: LOGIN_FAILED, data: null })
    }
};


function* logoutFun() {
    yield localStorage.removeItem("user");
    Swal.fire({
        icon: "success",
        title: "Logged Out !",
        showConfirmButton: false,
        timer: 1000
    });
};

function* userAuthSaga() {
    yield takeEvery(LOGIN, loginFun);
    yield takeEvery(LOGOUT, logoutFun);
};

export default userAuthSaga;