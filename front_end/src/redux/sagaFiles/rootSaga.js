import userAuthSaga from "./userAuthSaga";
import registrationSaga from "./registrationSaga";
import { fork } from 'redux-saga/effects';

function* rootSaga() {
    yield fork(userAuthSaga);
    yield fork(registrationSaga);
}
export default rootSaga;