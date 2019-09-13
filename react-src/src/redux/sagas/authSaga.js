import { all, takeEvery, put, call } from "redux-saga/effects";
import { types, actions } from "../actions/authActions";
import AuthApiService from "../../services/api/AuthService";
import AuthService from "../../services/auth";

function* setTokenRequest({ payload }) {
  try {
    const response = yield call([AuthApiService, AuthApiService.login], {
      email: payload.name,
      password: payload.password
    });
    yield call([AuthService, AuthService.setToken], response.data.access_token);
    yield put(actions.setTokenSuccess(response.data));
  } catch (err) {}
}

function* authWatcher() {
  yield takeEvery(`${types.SET_TOKEN}_REQUEST`, setTokenRequest);
}

export default function* rootSaga() {
  yield all([authWatcher()]);
}
