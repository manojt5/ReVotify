// LoginPage.js

import React from "react";
import LeftSide from "./LeftSide"; // Update the path accordingly
import Signup from "./Signup";
import "./Login.css"; // Update the path accordingly

const SignUpPage = () => {
  return (
    <div className="Login">
      <div className="left">
        <LeftSide />
      </div>
      <div className="right">
        <Signup />
      </div>
    </div>
  );
};

export default SignUpPage;
