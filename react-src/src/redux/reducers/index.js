import { combineReducers } from "redux";
import authReducer from "./authReducer";
import keywordReducer from "./keywordReducer";
import messageListReducer from "./messageListReducer";
import recordsReducer from "./recordsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  messageList: messageListReducer,
  recordList: recordsReducer
});

export default rootReducer;
