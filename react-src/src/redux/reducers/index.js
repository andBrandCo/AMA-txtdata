import { combineReducers } from "redux";
import authReducer from "./authReducer";
import keywordReducer from "./keywordReducer";
import messageListReducer from "./messageListReducer";
import recordsReducer from "./recordsReducer";
// import { types } from "../actions/authActions";

// const appReducer = combineReducers({
//   auth: authReducer,
//   keyword: keywordReducer,
//   messageList: messageListReducer,
//   recordList: recordsReducer
// });

// const rootReducer = (state, action) => {
//   if (`${types.USER_LOGOUT}_SUCCESS`) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  messageList: messageListReducer,
  recordList: recordsReducer
});

export default rootReducer;
