import React, { useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

const Signup = () => {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  // const submitsignup=()=>{
  //   console.log(name,email,password);
  //   axios.post("http://localhost:3001/signup",{name,email,password})
  //   .then(result=>console.log(result))
  //   .then(navigate("/login"))
  //   .catch(err=>console.log(err))
  // }
  const submitsignup = () => {
    console.log(name, email, password);
    axios
      .post("https://votify-back.vercel.app//signup", { name, email, password })
      .then((result) => {
        console.log(result);
        // Check if the response contains a message indicating an existing account
        if (result.data.message) {
          alert("user exists");
        } else {
          // If no message, navigate to the login page
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <IoPersonCircle className="icon" />
          <input type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className="input">
          <IoMdMail className="icon" />
          <input type="email" placeholder="Enter your Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="input">
          <RiLockPasswordFill className="icon" />
          <input type="password" placeholder="Enter your Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
      </div>
      <div className="forgot-password" onClick={()=>{navigate("/login")}}>
        Already have an account?{" "}
        <span>Click here</span>
      </div>
      <div className="submit-container" onClick={submitsignup}>
        <div className="submit">SignUp</div>
      </div>
    </div>
  );
};

export default Signup;
