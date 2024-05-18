import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Header from "./components/Header/Header";
import Features from "./components/Features/Features";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import PrivacyPolicy from "./components/Footer/FooterDocs/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "./components/Footer/FooterDocs/RefundPolicy/RefundPolicy";
import Terms_Conditions from "./components/Footer/FooterDocs/Terms_Conditions/Terms_Conditions";
import LeftSide from "./components/LoginSignup/LeftSide";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import PollHistory from "./components/Create/CreateHistory/PollHistory";
import VotingReview from "./components/Create/Vote/VotingReview/VotingReview";
import PollReview from './components/Create/Poll/PollReview/PollReview';
import Poll from "./components/Participate/Poll/PollHistory/PollHistory";
import Vote from "./components/Participate/Vote/VoteHistory/VoteHistory";
import PollDetails from "./components/Create/Poll/PollDetails/PollDetails";
import VoteDetails from "./components/Create/Vote/VoteDetails/VoteDetails";
import VotingQuestion from "./components/Create/Vote/VotingForm/VotingQuestion"
import PollingQuestion from "./components/Create/Poll/PollingForm/PollingQuestion"
import Userview from "./components/Participate/Vote/VotingForm/UserView";
import Pollresults from "./components/Results/Poll/Pollresults";
import VoteResults from "./components/Results/Vote/VoteResults";
import Pollpart from "./components/Participate/Poll/PollForm/Poll";
import SingleLogin from "./components/LoginSignup/SingleLogin";
import SingleSignup from "./components/LoginSignup/SingleSignup";
import Taskreview from "./components/Create/CreateHistory/Taskreview";
import PasswordChange from "./components/LoginSignup/singlechange";
import UploadImage from "./components/UploadImage";
import AppContext from "./utils/context";
import {Context} from "./utils/context"
import { useContext ,useEffect} from "react";
import axios from "axios";
function App() {
  const {user,setUser}=useContext(Context);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getuser');
  
        if (response.status === 200) {
          setUser(response.data.user.email);
          console.log("setting");
          console.log(response.data.user.email);
          console.log(user); // This may not reflect the updated value immediately
        } else {
          console.log('Failed to get user.');
        }
      } catch (error) {
        console.error('Get user error:', error);
      }
    };
  
    getUser(); // Call the getUser function
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  // setInterval(() => {
  //   console.log(user);
  // }, 10);
  
  return (
    <div className="App">
      <BrowserRouter>
      <AppContext>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <AboutUs />
                <Features />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/voteresults/:id"
            element={
              <>
                <Header />
                <VoteResults/>
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/partpoll/:id"
            element={
              <>
                <Header />
                <Pollpart/>
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/votingform"
            element={
              <>
                <Header />
                <VotingQuestion />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/pollingform"
            element={
              <>
                <Header />
                <PollingQuestion />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          {/* <Route
            path="/polldetails"
            element={
              <>
                <Header />
                <PollDetails/>
                <Newsletter />
                <Footer />
              </>
            }
          ></Route> */}
          <Route
            path="/votedetails"
            element={
              <>
                <Header />
                <VoteDetails />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <ContactUs />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/PrivacyPolicy"
            element={
              <>
                <Header />
                <PrivacyPolicy />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/RefundPolicy"
            element={
              <>
                <Header />
                <RefundPolicy />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/Terms_Conditions"
            element={
              <>
                <Header />
                <Terms_Conditions />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/polldetails"
            element={
              <>
                <Header />

                <PollDetails />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/votereview"
            element={
              <>
                <Header />
                <VotingReview />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/pollresults/:id"
            element={
              <>
                <Header />
                <Pollresults/>
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/pollhistory"
            element={
              <>
                <Header />
                <Poll />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/votehistory"
            element={
              <>
                <Header />
                <Vote />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/pollreview"
            element={
              <>
                <Header />
                <PollReview />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/history"
            element={
              <>
                <Header />
                <PollHistory />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/partvote/:id"
            element={
              <>
                <Header />
                <Userview />
                <Newsletter/>
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                {/* <Header/> */}
                {/* <div className="Login">
                  <div className="left">
                    <LeftSide />
                  </div>
                  <div className="right">
                    <LoginSignup />
                  </div>
                </div> */}
                <SingleLogin/>
                {/* <Newsletter/>
            <Footer/> */}
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <SingleSignup/>
              </>
            }
          ></Route>
          <Route
            path="/read/:id"
            element={
              <>
                <Header />
                <Taskreview />
                <Newsletter/>
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/upload"
            element={
              <>
                <Header />
                <UploadImage />
                <Newsletter/>
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/password_change"
            element={
              <>
                <Header />
                <PasswordChange />
                <Newsletter />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
        </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
