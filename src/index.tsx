import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ActionCableProvider } from "react-actioncable-provider";
import { webSocketUrl } from "./Constants";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import counterReducer from "./Store/Reducers/Reducers";

const store = createStore(counterReducer);

ReactDOM.render(
  <ActionCableProvider
    url={webSocketUrl}
  >
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>
  </ActionCableProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
