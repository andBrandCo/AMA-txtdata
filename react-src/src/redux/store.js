import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootSaga from "./sagas/authSaga";
import { keywordWatcherSaga } from "./sagas/keywordSaga";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware, logger),
    reduxDevtools
  )
);
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(keywordWatcherSaga);

export default store;
