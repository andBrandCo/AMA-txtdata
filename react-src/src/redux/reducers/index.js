import { combineReducers } from "redux";
import authReducer from "./authReducer";
import keywordReducer from "./keywordReducer";
import messageListReducer from "./messageListReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  messageList: messageListReducer
});

export default rootReducer;
