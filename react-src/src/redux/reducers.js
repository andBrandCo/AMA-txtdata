import { combineReducers } from "redux";

export const reducers = {};

const appReducer = combineReducers({
  ...reducers
});
export default (state, action) => {
  if (action.type === "USER_LOGOUT_SUCCESS") {
    state = undefined;
  }

  return appReducer(state, action);
};
