// LoginPage.js

import React from "react";
import LeftSide from "./LeftSide"; // Update the path accordingly
import Login from "./Login";
import './Login.css' // Update the path accordingly

const LoginPage = () => {
  return (
          <div className="Login">
            <div className="left">
              <LeftSide />
            </div>
            <div className="right">
              <Login />
            </div>
          </div>
  );
};

export default LoginPage;
