import { takeEvery, put, call } from "redux-saga/effects";
import { types, actions } from "../actions/recordsActions";
import { saveAs } from "file-saver";
import RecordService from "../../services/api/RecordService";
import { getFormattedDate } from "../../utils";

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

function* downloadRecordRequest() {
  try {
    const { data } = yield call([
      RecordService,
      RecordService.getAllRecordCSVList
    ]);
    const date = getFormattedDate(new Date());
    const fileName = `AllRecords ${date}.tsv`;
    const csvData = new Blob([data], { type: "text/csv;charset=utf-8;" });
    saveAs(csvData, fileName);
  } catch (err) {}
}

function* sendReportRequest({ payload }) {
  try {
    const response = yield call([
      RecordService,
      RecordService.sendReportToServer(payload)
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
  yield takeEvery(`${types.GET_ALL_RECORD_CSV}_REQUEST`, downloadRecordRequest);
}
