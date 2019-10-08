import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import { authWatcher } from "./sagas/authSaga";
import { keywordWatcherSaga } from "./sagas/keywordSaga";
import { recordWatcher } from "./sagas/recordSaga";
// import { wsMiddleware } from "../services/socket/wsMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(authWatcher);
sagaMiddleware.run(keywordWatcherSaga);
sagaMiddleware.run(recordWatcher);

export default store;
