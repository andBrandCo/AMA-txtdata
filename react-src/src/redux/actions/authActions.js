export const types = {
  SET_TOKEN: "SET_TOKEN"
};

export const setTokenRequest = payload => ({
  type: `${types.SET_TOKEN}_REQUEST`,
  payload
});
export const setTokenSuccess = payload => ({
  type: `${types.SET_TOKEN}_SUCCESS`,
  payload
});
export const setTokenFailed = error => ({
  type: `${types.SET_TOKEN}_FAILED`,
  payload: error
});

// export const actions = {
//   setTokenRequest,
//   setTokenSuccess,
//   setTokenFailed
// };
