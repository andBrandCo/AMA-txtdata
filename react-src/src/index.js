import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./style/theme";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import store from "./redux/store";

import App from "./components/App";
// import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
