export const types = {
  SET_TOKEN: "SET_TOKEN",
  USER_LOGOUT: "USER_LOGOUT",
  RECOVER_PASSWORD: "RECOVER_PASSWORD"
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

export const userLogoutRequest = payload => ({
  type: `${types.USER_LOGOUT}_REQUEST`,
  payload
});
export const userLogoutSuccess = () => ({
  type: `${types.USER_LOGOUT}_SUCCESS`
});
export const userLogoutFailed = error => ({
  type: `${types.USER_LOGOUT}_FAILED`,
  payload: error
});

export const recoverPasswordRequest = payload => ({
  type: `${types.RECOVER_PASSWORD}_REQUEST`,
  payload
});
export const recoverPasswordSuccess = () => ({
  type: `${types.RECOVER_PASSWORD}_SUCCESS`
});
export const recoverPasswordFailed = error => ({
  type: `${types.RECOVER_PASSWORD}_FAILED`,
  payload: error
});

// export const actions = {
//   setTokenRequest,
//   setTokenSuccess,
//   setTokenFailed
// };
