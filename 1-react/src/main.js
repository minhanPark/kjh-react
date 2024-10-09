import React from "react";
import ReactDOM from "react-dom/client";
import ReactDOM2 from "react-dom";
import App from "./App";

const { worker } = require("../../shared/mocks/browser");
worker.start({
  onUnhandledRequest: "bypass",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const root2 = ReactDOM.createRoot(document.getElementById("dialog"));

//root.render(<App />);

const Red = () =>
  ReactDOM2.createPortal(
    <div className="red">Red</div>,
    document.getElementById("dialog")
  );
const Green = () => (
  <div className="green" onClick={(e) => console.log("click", e)}>
    <div>Green</div>
    <Red />
  </div>
);

root.render(<Green />);
//root2.render(<Red />);
