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

function* sendAutoResponseRequest({ payload }) {
  try {
    console.log(" sendAR: payload: ", payload);
    const response = yield call(
      [editDBDataService, editDBDataService.sendAutoResponse],
      {
        _id: payload._id,
        autoResponse: payload.autoResponse
      }
    );
    console.log("response: ", response);
    yield put(actions.sendAutoResponseSuccess(response.data));
  } catch (err) {
    console.log("err- ", err);
  }
}

export function* keywordWatcherSaga() {
  yield takeEvery(`${types.SEND_KEYWORD}_REQUEST`, sendKeywordRequest);
  yield takeEvery(`${types.GET_MESSAGE_LIST}_REQUEST`, getMessageListRequest);
  yield takeEvery(
    `${types.SEND_AUTO_RESPONSE}_REQUEST`,
    sendAutoResponseRequest
  );
}

// export default function* rootSaga() {
//   yield all([keywordWatcher()]);
// }
