export const types = {
  SEND_KEYWORD: "SEND_KEYWORD",
  SEND_AUTO_RESPONSE: "SEND_AUTO_RESPONSE",
  GET_MESSAGE_LIST: "GET_MESSAGE_LIST"
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

const sendAutoResponseRequest = payload => ({
  type: `${types.SEND_AUTO_RESPONSE}_REQUEST`,
  payload
});
const sendAutoResponseSuccess = payload => ({
  type: `${types.SEND_AUTO_RESPONSE}_SUCCESS`,
  payload
});
const sendAutoResponseFailed = error => ({
  type: `${types.SEND_AUTO_RESPONSE}_FAILED`,
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

export const actions = {
  sendKeywordRequest,
  sendKeywordSuccess,
  sendKeywordFailed,
  sendAutoResponseRequest,
  sendAutoResponseSuccess,
  sendAutoResponseFailed,
  getMessageListRequest,
  getMessageListSuccess,
  getMessageListFailed
};
