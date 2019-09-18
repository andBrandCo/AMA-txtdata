import { all, takeEvery, put, call } from "redux-saga/effects";
import { types, actions } from "../actions/authActions";
import AuthApiService from "../../services/api/AuthService";
import AuthService from "../../services/auth";

function* setTokenRequest({ payload }) {
  try {
    console.log("payload: ", payload);
    const response = yield call([AuthApiService, AuthApiService.login], {
      email: payload.email,
      password: payload.password
    });
    console.log("response: ", response);
    yield call(
      [AuthService, AuthService.setToken],
      response.data.access_token,
      "token"
    );
    yield put(actions.setTokenSuccess(response.data));
  } catch (err) {}
}

function* authWatcher() {
  yield takeEvery(`${types.SET_TOKEN}_REQUEST`, setTokenRequest);
}

export default function* rootSaga() {
  yield all([authWatcher()]);
}
