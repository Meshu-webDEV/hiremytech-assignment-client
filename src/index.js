import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SystemState from "./context/System/SystemState";
import CartState from "./context/Cart/CartState";
import AuthenticationState from "./context/Authentication/AuthenticationState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthenticationState>
      <SystemState>
        <CartState>
          <App />
        </CartState>
      </SystemState>
    </AuthenticationState>
  </BrowserRouter>
);
