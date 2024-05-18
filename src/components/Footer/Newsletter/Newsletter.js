import "./Newsletter.scss";
import React from "react";
import { useState } from "react";
import axios from "axios";
import {FaFacebook,FaInstagram,FaLinkedin,FaTwitter} from "react-icons/fa"
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    
    return (
      <div className="newsletter-section" style={{position:'relative'}}>
        <div className="newsletter-content">
          <span className="small-text">NEWSLETTER</span>
          <span className="big-text">
            Subscribe for updates on New Amazing Services
          </span>
          <div className="form">
            <input type="email" placeholder="Email-Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
            {/* <button onClick={handleSubmit}>Subscribe</button> */}
            <button>Subscribe</button>
          </div>
          {subscribed && <span className="success-message" style={{ color: "green" }}>Subscribed Successfully</span>}
          <div>Will be used according to our privacy policy</div>
          <div className="social-icons">
            <div className="iconn">
              <a
                href="https://www.facebook.com/login/"
                target="blank"
                style={{ color: "white", textDecoration: "none" ,margin:'0px'}}
              >
                <FaFacebook size={14} />
              </a>
            </div>
            <div className="iconn">
              <a
                href="https://twitter.com/"
                target="blank"
                style={{ color: "white", textDecoration: "none",margin:'0px' }}
              >
                <FaTwitter size={14} />
              </a>
            </div>
            <div className="iconn">
              <a
                href="https://www.linkedin.com/in/siva-sai-manoj-t-585a66247"
                target="blank"
                style={{ color: "white", textDecoration: "none" ,margin:'0px'}}
              >
                <FaLinkedin size={14} />
              </a>
            </div>
            <div className="iconn">
              <a
                href="https://www.instagram.com/"
                target="blank"
                style={{ color: "white", textDecoration: "none" ,margin:'0px'}}
              >
                <FaInstagram size={14} />
              </a>
            </div>
            
          </div>
        </div>
      </div>
    );
};

export default Newsletter;
