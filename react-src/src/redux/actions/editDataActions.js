export const types = {
  SEND_KEYWORD: "SEND_KEYWORD",
  GET_MESSAGE_LIST: "GET_MESSAGE_LIST",
  UPDATE_ROW: "UPDATE_ROW",
  DELETE_ROW: "DELETE_ROW",
  CREATE_ROW: "CREATE_ROW"
};

const sendKeywordRequest = payload => {
  return {
    type: `${types.SEND_KEYWORD}_REQUEST`,
    payload
  };
};
const sendKeywordSuccess = payload => ({
  type: `${types.SEND_KEYWORD}_SUCCESS`,
  payload
});
const sendKeywordFailed = error => ({
  type: `${types.SEND_KEYWORD}_FAILED`,
  payload: error
});

const getMessageListRequest = payload => ({
  type: `${types.GET_MESSAGE_LIST}_REQUEST`,
  payload
});
const getMessageListSuccess = payload => ({
  type: `${types.GET_MESSAGE_LIST}_SUCCESS`,
  payload
});
const getMessageListFailed = error => ({
  type: `${types.GET_MESSAGE_LIST}_FAILED`,
  payload: error
});

const updateRowRequest = payload => ({
  type: `${types.UPDATE_ROW}_REQUEST`,
  payload
});
const updateRowSuccess = payload => ({
  type: `${types.UPDATE_ROW}_SUCCESS`,
  payload
});
const updateRowFailed = error => ({
  type: `${types.UPDATE_ROW}_FAILED`,
  payload: error
});

const deleteRowRequest = payload => ({
  type: `${types.DELETE_ROW}_REQUEST`,
  payload
});
const deleteRowSuccess = payload => ({
  type: `${types.DELETE_ROW}_SUCCESS`,
  payload
});
const deleteRowFailed = error => ({
  type: `${types.DELETE_ROW}_FAILED`,
  payload: error
});

const createRowRequest = payload => ({
  type: `${types.CREATE_ROW}_REQUEST`,
  payload
});
const createRowSuccess = payload => ({
  type: `${types.CREATE_ROW}_SUCCESS`,
  payload
});
const createRowFailed = error => ({
  type: `${types.CREATE_ROW}_FAILED`,
  payload: error
});

export const actions = {
  sendKeywordRequest,
  sendKeywordSuccess,
  sendKeywordFailed,
  getMessageListRequest,
  getMessageListSuccess,
  getMessageListFailed,
  updateRowRequest,
  updateRowSuccess,
  updateRowFailed,
  deleteRowRequest,
  deleteRowSuccess,
  deleteRowFailed,
  createRowRequest,
  createRowSuccess,
  createRowFailed
};
