import { takeEvery, put, call } from "redux-saga/effects";
import {
  types,
  setTokenSuccess,
  userLogoutSuccess,
  recoverPasswordSuccess,
  recoverPasswordFailed
} from "../actions/authActions";
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
    payload.history.push("/messages/keywords");
  } catch (err) {}
}

function* logoutUserRequest({ payload }) {
  try {
    console.log("Start logout");
    yield call([AuthService, AuthService.clearAllAppStorage]);
    yield put(userLogoutSuccess());
    console.log("clear state");
    payload.history.push("/login");
  } catch (err) {}
}

function* recoverPasswordRequest({ payload }) {
  try {
    console.log("Start recover Password");
    yield call([AuthApiService, AuthApiService.recoverPassword], {
      email: payload
    });
    yield put(recoverPasswordSuccess());
  } catch (err) {
    console.log("err in RECover - ", err.message);
    yield put(recoverPasswordFailed());
    alert("User not exist in DB!");
  }
}

export function* authWatcher() {
  yield takeEvery(`${types.SET_TOKEN}_REQUEST`, setTokenRequest);
  yield takeEvery(`${types.USER_LOGOUT}_REQUEST`, logoutUserRequest);
  yield takeEvery(`${types.RECOVER_PASSWORD}_REQUEST`, recoverPasswordRequest);
}
