import React, { useState } from "react";
import "./LoginSignup.css";
import { IoMdMail } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up")
    return (
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <IoPersonCircle className="icon" />
              <input type="text" placeholder="Enter your name" />
            </div>
          )}
          <div className="input">
            <IoMdMail className="icon" />
            <input type="email" placeholder="Enter your Email" />
          </div>
          <div className="input">
            <RiLockPasswordFill className="icon"/>
            <input type="password" placeholder="Enter your Password" />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Lost Password? <span>Click here</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    );
};

export default LoginSignup;
