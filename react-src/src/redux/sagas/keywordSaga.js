import { all, takeEvery, put, call } from "redux-saga/effects";
import { types, actions } from "../actions/editDataActions";
import editDBDataService from "../../services/api/editDBDataService";
// import AuthService from "../../services/auth";

function* sendKeywordRequest({ payload }) {
  try {
    console.log(" sendKWR: payload: ", payload);
    const response = yield call(
      [editDBDataService, editDBDataService.sendKeyword],
      {
        keyword: payload
      }
    );
    console.log("response: ", response);
    yield put(actions.sendKeywordSuccess(response.data));
    // yield put(actions.getMessageListRequest());
  } catch (err) {
    console.log("err- ", err);
  }
}

function* getMessageListRequest({ payload }) {
  try {
    console.log(" getML: payload: ", payload);
    const response = yield call([
      editDBDataService,
      editDBDataService.getMessageList
    ]);
    console.log("response: ", response);
    yield put(actions.getMessageListSuccess(response.data));
  } catch (err) {
    console.log("err- ", err);
  }
}

function* updateRowRequest({ payload }) {
  try {
    console.log(" updateROW Req: payload: ", payload);
    const response = yield call(
      [editDBDataService, editDBDataService.updateRow],
      payload
    );
    console.log("response: ", response);
    yield put(actions.updateRowSuccess(response.data));
  } catch (err) {
    console.log("err- ", err);
  }
}

function* deleteRowRequest({ payload }) {
  try {
    console.log(" delete ROW Req: id: ", payload);
    const response = yield call(
      [editDBDataService, editDBDataService.deleteRow],
      payload
    );
    console.log("del response: ", response);
    yield put(actions.deleteRowSuccess(response.data));
  } catch (err) {
    console.log("err- ", err);
  }
}

function* createRowRequest({ payload }) {
  try {
    console.log(" create ROW Req: ", payload);
    const response = yield call(
      [editDBDataService, editDBDataService.createRow],
      payload
    );
    console.log("created! response: ", response);
    yield put(actions.createRowSuccess(response.data));
  } catch (err) {
    console.log("err- ", err);
  }
}

export function* keywordWatcherSaga() {
  yield takeEvery(`${types.SEND_KEYWORD}_REQUEST`, sendKeywordRequest);
  yield takeEvery(`${types.GET_MESSAGE_LIST}_REQUEST`, getMessageListRequest);
  yield takeEvery(`${types.UPDATE_ROW}_REQUEST`, updateRowRequest);
  yield takeEvery(`${types.DELETE_ROW}_REQUEST`, deleteRowRequest);
  yield takeEvery(`${types.CREATE_ROW}_REQUEST`, createRowRequest);
  // yield takeEvery(
  //   `${types.SEND_AUTO_RESPONSE}_REQUEST`,
  //   sendAutoResponseRequest
  // );
}

// export default function* rootSaga() {
//   yield all([keywordWatcher()]);
// }
