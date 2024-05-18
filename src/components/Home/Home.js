import React from "react";
import "./Home.css";
import img1 from "../../staticImages/Home1.png";
import { useState,useEffect } from "react";
function Home() {
  
  return (
    <header classname='stickyr mainn' style={{height: '90vh'}}>
      
      
      
      <div style={{display:'flex',paddingTop:'100px'}}>
        <div style={{padding:'100px',width:'60%'}}>
          <div style={{fontSize:'60px'}}>Empower Change!</div>
          <div style={{fontSize:'30px'}}>
            Your vote shapes the future. Join us in making a difference!
          </div>
        </div>
        <div
          className="head"
          style={{
            position: "absolute",
            right: "100px",
            top: "150px",
            width: "500px",
            height: "500px",
          }}
        >
          <img src={img1} style={{height:'500px',width:'500px'}}></img>
        </div>
      </div>

    </header>
  );
}

export default Home;
