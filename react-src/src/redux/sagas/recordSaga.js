import { takeEvery, put, call } from "redux-saga/effects";
import { types, actions } from "../actions/recordsActions";
import RecordService from "../../services/api/RecordService";

function* getAllRecordRequest({ payload }) {
  try {
    console.log("payload: ", payload);
    const response = yield call([
      RecordService,
      RecordService.getAllRecordList
    ]);
    console.log("Records response: ", response);
    yield put(actions.getAllRecordSuccess(response.data));
    console.log("All done!!!");
  } catch (err) {}
}

function* sendReportRequest() {
  try {
    const response = yield call([
      RecordService,
      RecordService.sendReportToServer
    ]);
    console.log("REport response: ", response);
    alert("Report was sent successfully!");
    // yield put(actions.getAllRecordSuccess(response.data));
    console.log("All done!!!");
  } catch (err) {}
}

export function* recordWatcher() {
  yield takeEvery(`${types.GET_ALL_RECORD}_REQUEST`, getAllRecordRequest);
  yield takeEvery(`${types.SEND_REPORT_TO_SERVER}_REQUEST`, sendReportRequest);
}
