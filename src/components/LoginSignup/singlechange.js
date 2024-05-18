// LoginPage.js

import React from "react";
import LeftSide from "./LeftSide"; // Update the path accordingly
import Change from "./PasswordChange";
import './Login.css' // Update the path accordingly

const ChangePassword = () => {
  return (
          <div className="Login">
            <div className="left">
              <LeftSide />
            </div>
            <div className="right">
              <Change />
            </div>
          </div>
  );
};

export default ChangePassword;