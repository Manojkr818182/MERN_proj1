import { takeEvery, put } from "redux-saga/effects";
import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from "../types/type";
import axios from "axios";
import Swal from "sweetalert2";


function* registerFun(action) {
    const res = yield axios.post('http://192.168.0.110:6060/api/signup', action.data);
    if (res.data.code === 1) {
        yield put({ type: REGISTER_SUCCESS, data: {} })
        Swal.fire({
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1000
        });
    } else if (res.data.code === 111) {
        let error = {};
        error.phone = res.data.message
        yield put({ type: REGISTER_FAILED, data: error })
    } else if (res.data.code === 112) {
        let error = {};
        error.email = res.data.message
        yield put({ type: REGISTER_FAILED, data: error })
    } else {

    }
};

function* registrationSaga() {
    yield takeEvery(REGISTER, registerFun);
};

export default registrationSaga;