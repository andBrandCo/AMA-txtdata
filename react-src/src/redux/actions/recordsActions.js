export const types = {
  GET_ALL_RECORD: "GET_ALL_RECORD",
  GET_ALL_RECORD_CSV: "GET_ALL_RECORD_CSV",
  SEND_REPORT_TO_SERVER: "SEND_REPORT_TO_SERVER"
};

const getAllRecordRequest = payload => ({
  type: `${types.GET_ALL_RECORD}_REQUEST`,
  payload
});
const getAllRecordSuccess = payload => ({
  type: `${types.GET_ALL_RECORD}_SUCCESS`,
  payload
});
const getAllRecordFailed = error => ({
  type: `${types.GET_ALL_RECORD}_FAILED`,
  payload: error
});

const getAllRecordCSVRequest = payload => ({
  type: `${types.GET_ALL_RECORD_CSV}_REQUEST`,
  payload
});
const getAllRecordCSVSuccess = payload => ({
  type: `${types.GET_ALL_RECORD_CSV}_SUCCESS`,
  payload
});
const getAllRecordCSVFailed = error => ({
  type: `${types.GET_ALL_RECORD_CSV}_FAILED`,
  payload: error
});

const sendReportRequest = payload => ({
  type: `${types.SEND_REPORT_TO_SERVER}_REQUEST`,
  payload
});
const sendReportSuccess = payload => ({
  type: `${types.SEND_REPORT_TO_SERVER}_SUCCESS`,
  payload
});
const sendReportFailed = error => ({
  type: `${types.SEND_REPORT_TO_SERVER}_FAILED`,
  payload: error
});

export const actions = {
  getAllRecordRequest,
  getAllRecordSuccess,
  getAllRecordFailed,
  getAllRecordCSVRequest,
  getAllRecordCSVSuccess,
  getAllRecordCSVFailed,
  sendReportRequest,
  sendReportSuccess,
  sendReportFailed
};
