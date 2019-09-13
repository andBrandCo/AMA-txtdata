import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import store from "./redux/store";

import App from "./components/App";
// import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
