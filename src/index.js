import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.output.css";
import "./slick.css";
import "./slick-theme.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>,
  document.getElementById("root")
);
