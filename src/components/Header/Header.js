import React, { useState, useEffect ,useContext} from 'react';
import './Header.css';
import {Context} from "../../utils/context"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
function Header() {
  const navigate=useNavigate();
  const {user,setUser}=useContext(Context);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // const [cutuser,setCutuser]
  // const [user,setUser]=useState("");
  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/logout');
  
      if (response.status === 200) {
        sessionStorage.removeItem('user')
        console.log('Logout successful.');
        window.location.reload();
      } else {
        console.log('Logout failed.');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    // Check if user details are in session storage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleSuccess = (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential);
    console.log(userObject)
    // console.log(JSON.stringify(userObject.name))
    setUser(JSON.stringify(userObject.name));

    // Store user details in session storage
    sessionStorage.setItem('user', JSON.stringify(userObject));
    // sessionStorage.setItem('user', userObject);
    console.log("good")
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleLoggout = () => {
    googleLogout();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    setUser(null);
    sessionStorage.removeItem('user');
  };
  return (
    <header className={` ${scrolled ? `stic` : ''}`} style={{ zIndex: '100' }}>
      <div className="navba">
        <div className="navba-left">
          <span onClick={()=>{navigate("/")}} className="text-4xl" style={{ margin: '0px' ,cursor:'pointer'}}>
            Votify
          </span>
        </div>
        <ul className="na-links">
          <li>
            <span onClick={()=>{navigate("/")}} style={{ margin: '0px' ,cursor:'pointer'}}>
              Home
            </span>
          </li>

          <div class="tw:relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                class="tw:inline-flex w-full tw:justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 hover:text-[#9333EA;]"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                style={{marginLeft:"-12px",marginRight:"5px"}}
              >
                Create
              </button>
            </div>

            {isDropdownOpen && (
              <div
                class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <span onClick={()=>{navigate("/polldetails")}}
                  
                    class="text-gray-700 block px-4 py-2 text-base"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    style={{ margin: '0px',cursor:'pointer' }}
                  >
                    Create a Poll
                  </span>
                  <span onClick={()=>{navigate("/votedetails")}}
                    class="text-gray-700 block px-4 py-2 text-base"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                    style={{ margin: '0px' ,cursor:'pointer'}}
                  >
                    Create an Election
                  </span>
                </div>
              </div>
            )}
          </div>
          <li>
            <span onClick={()=>{navigate("/pollhistory")}} style={{ margin: '0px',cursor:'pointer' }}>
              Poll
            </span>
          </li>
          <li>
            <span onClick={()=>{navigate("/votehistory")}} style={{ margin: '0px',cursor:'pointer' }}>
              Vote
            </span>
          </li>
          <li>
            <span onClick={()=>{navigate("/history")}} style={{ margin: '0px' ,cursor:'pointer'}}>
              History
            </span>
          </li>
          {/* {user &&(<li>
            <span onClick={()=>{navigate("/")}} style={{ margin: '0px' ,cursor:'pointer'}}>
              Welcome,{user}
            </span>
          </li>)} */}

          <li style={{ width: '120px' }}>
            <span onClick={()=>{navigate("/contact")}} style={{ margin: '0px',cursor:'pointer' }}>
              Contact Us
            </span>
          </li>
          {sessionStorage.getItem('user') ? (
        <div>
          <h3>Welcome, {user.name}</h3>
          <button onClick={handleLoggout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
          <div className="flex items-center justify-center">
            {user==""?(<span onClick={()=>{navigate("/login")}}
              class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-transparent shadow rounded-md group"
              style={{ margin: '0px' }}
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100"></span>
              <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white" style={{fontSize:'23px',cursor:'pointer'}}>
                Login/SignUp
              </span>
            </span>):<span
              
              class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-transparent shadow rounded-md group"
              style={{ margin: '0px' }}
              onClick={handleLogout}
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100"></span>
              <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white" style={{fontSize:'23px',cursor:'pointer'}}>
                LogOut
              </span>

            </span>}
          </div>
        </ul>
      </div>

      <div
        style={{
          display: ' flex',
          justifyContent: 'center',
          marginTop: '5px',
        }}
      >
        <hr
          style={{
            borderTopWidth: '1px',
            borderTopColor: 'grey',
            width: '95%',
            borderRadius: '1px',
          }}
        />
      </div>
      
    </header>
  );
}

export default Header;
