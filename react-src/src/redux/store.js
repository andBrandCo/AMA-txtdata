import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootSaga from "./sagas/authSaga";
import reducer from "./reducers/authReducer";

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

export default store;
