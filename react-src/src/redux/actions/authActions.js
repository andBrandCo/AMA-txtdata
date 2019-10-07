export const types = {
  SET_TOKEN: "SET_TOKEN",
  USER_LOGOUT: "USER_LOGOUT"
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

export const userLogoutRequest = () => ({
  type: `${types.USER_LOGOUT}_REQUEST`
});
export const userLogoutSuccess = payload => ({
  type: `${types.USER_LOGOUT}_SUCCESS`,
  payload
});
export const userLogoutFailed = error => ({
  type: `${types.USER_LOGOUT}_FAILED`,
  payload: error
});

// export const actions = {
//   setTokenRequest,
//   setTokenSuccess,
//   setTokenFailed
// };