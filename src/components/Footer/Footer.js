import "./Footer.scss";
import React from "react";
import payment from "../../staticImages/payments.png"
import { FaLocationArrow, FaMobileAlt, FaEnvelope ,FaFacebook,FaInstagram } from "react-icons/fa"
import { useNavigate} from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
    duration: 500
  });
};

const Footer = () => {
    
    const navigate=useNavigate();
    //console.log(contact?.data[0]?.attributes?.Address)
    return (
      <div className="footer">
        <div className="footer-content">
          <div className="col">
            <div className="title">About</div>
            <div className="text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quidem assumenda quis temporibus impedit veniam reiciendis rerum iusto doloribus maxime! Et deleniti mollitia adipisci quos fuga nulla quisquam minima vitae!
            </div>
          </div>
          <div className="col">
            <div className="title">Contact</div>
            <div className="text">
              <div className="c-item">
                <FaLocationArrow />
                <div className="text">
                  <a
                    href={`https://www.google.com/maps/search/?q=Vellore`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    Vellore,India
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaMobileAlt />
                <div className="text">
                  +919876543219
                </div>
              </div>
              <div className="c-item">
                <FaEnvelope />
                <div className="text">
                  <a
                    href={`mailto:abc@gmail.com`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    abc@gmail.com
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaFacebook />
                <div className="text">
                  <a
                    href={`https://www.facebook.com/`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    Facebook{" "}
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaInstagram />
                <div className="text">
                  <a
                    href={`https://www.instagram.com/`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    Instagram{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="title">Services</div>

            <span className="text" onClick={()=>{navigate("/vote")}}>Cast a Vote</span>
                    <span className="text" onClick={()=>{navigate("/pollhistory")}}>Create a Poll</span>
                    <span className="text" onClick={()=>{navigate("/")}}>About Us</span>
                    <span className="text" onClick={()=>{navigate("/contact");scrollToTop();}}>Contact Us</span>
                    <span className="text">Random5</span>
                    <span className="text">Random6</span>
            
          </div>
          <div className="col">
            <div className="title">Pages</div>
            <span
              className="text"
              onClick={() => {
                navigate("/");
                scrollToTop()
              }}
            >
              Home
            </span>
            <span
              className="text"
              onClick={() => {
                navigate("/");
                scrollToTop()
              }}
            >
              About
            </span>
            <span className="text" onClick={()=>{navigate("/PrivacyPolicy");scrollToTop()}}>Privacy Policy</span>
            <span className="text" onClick={()=>{navigate("/RefundPolicy");scrollToTop()}}>Refund Policy</span>
            <span className="text" onClick={()=>{navigate("/Terms_Conditions");scrollToTop()}}>Terms & Conditions</span>
            <span
              className="text"
              onClick={() => {
                navigate("/contact");
                scrollToTop();
              }}
            >
              Contact Us
            </span>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="bottom-bar-content">
            <div className="text">
              © 2023 Votify. All Rights Reserved.
            </div>
            <img src={payment}></img>
            
          </div>
        </div>
      </div>
    );
};

export default Footer;
