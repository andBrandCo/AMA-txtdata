import { combineReducers } from "redux";
import authReducer from "./authReducer";
import keywordReducer from "./keywordReducer";
import messageListReducer from "./messageListReducer";
import recordsReducer from "./recordsReducer";
import { types } from "../actions/authActions";

const appReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  messageList: messageListReducer,
  recordList: recordsReducer
});

const rootReducer = (state, action) => {
  if (action.type === `${types.USER_LOGOUT}_SUCCESS`) {
    console.log("logout Action. REducer-clear State ");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
// const rootReducer = (state, action) =>
//   action.type === `${types.USER_LOGOUT}_SUCCESS`
//     ? appReducer(undefined, action)
//     : appReducer(state, action);

export default rootReducer;
