import React, { useState ,useContext} from "react";
import "./LoginSignup.css";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import {Context} from "../../utils/context"
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user,setUser}=useContext(Context);
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      if (response.status === 200) {
        var k=email
        const userData = { email: email ,name:k.slice(0, -10)};
            sessionStorage.setItem('user', JSON.stringify(userData));
        navigate("/")
        alert("Login successful");
        setUser(email);
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
        <div className="text">Login</div>
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
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div 
        className="forgot-password"
        onClick={() => {
          navigate("/password_change")
        }}
        >
        Change Password? <span>Click here</span>
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
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;