import { takeEvery, put, call } from "redux-saga/effects";
import { types, setTokenSuccess } from "../actions/authActions";
import AuthApiService from "../../services/api/AuthService";
import AuthService from "../../services/auth";

function* setTokenRequest({ payload }) {
  try {
    console.log("payload: ", payload);
    const response = yield call([AuthApiService, AuthApiService.login], {
      email: payload.email,
      password: payload.password
    });
    console.log("Auth response: ", response);
    yield call(
      [AuthService, AuthService.setToken],
      response.data.access_token,
      "token"
    );
    yield put(setTokenSuccess(response.data));
    console.log("ready to push");

    payload.history.push("/messages");
  } catch (err) {}
}

export function* authWatcher() {
  yield takeEvery(`${types.SET_TOKEN}_REQUEST`, setTokenRequest);
}
