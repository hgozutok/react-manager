import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import "./index.css";
import { App } from "./App";

// setup fake backend
// import { fakeBackend } from "./_helpers";
import { BrowserRouter } from "react-router-dom";
// fakeBackend();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("app")
);
