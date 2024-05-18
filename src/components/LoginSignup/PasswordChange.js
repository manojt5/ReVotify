import React, { useState ,useContext} from "react";
import "./LoginSignup.css";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import {Context} from "../../utils/context"
const Change = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [prev_password, setprev_Password] = useState("");
  const [new_password, setnew_Password] = useState("");
  const {user,setUser}=useContext(Context);
  const handleLogin = async () => {
    try {
        console.log(email);
        console.log(prev_password);
        console.log(new_password);
        const response = await axios.post("http://localhost:3001/password_change", {
        email,
        prev_password,
        new_password
      });
      if (response.status === 200) {
        alert("Password change successful");
        navigate("/login");
      } else {
        alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid credentials");
        } else if (error.response.status === 404) {
          alert("User not found. Please sign up.");
          navigate("/signup");
        } else {
          alert("Server error. Please try again later.");
        }
      } else {
        console.error("Axios error:", error);
        alert("Network or server error. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Change Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <IoMdMail className="icon" />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Enter your Previous Password"
            value={prev_password}
            onChange={(e) => setprev_Password(e.target.value)}
          />
        </div>
        <div className="input">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Enter your New Password"
            value={new_password}
            onChange={(e) => setnew_Password(e.target.value)}
          />
        </div>
      </div>
      <div 
        className="forgot-password"
        onClick={() => {
            navigate("/login")
        }}
            >
        Login? <span>Click here</span>
      </div>
      <div
        className="forgot-password"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't have an account <span>Click here</span>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Change Password
        </div>
      </div>
    </div>
  );
};

export default Change;