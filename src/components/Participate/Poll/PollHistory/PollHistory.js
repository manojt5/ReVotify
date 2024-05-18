import React, { useState, useEffect } from 'react';
import { TfiInfoAlt } from 'react-icons/tfi';
import './PollHistory.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ElectionCard = ({ electionData, updateElectionData, title, description, starttime, endtime, _id, currentUser, participatedList }) => {
  const navigate = useNavigate();
  const [isCountdownExpired, setCountdownExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //console.log(_id,currentUser,participatedList)
  const calculateTimeRemaining = () => {
    const endTimeObj = new Date(endtime);
    const currentTime = new Date();
    const timeDiff = endTimeObj - currentTime;

    if (timeDiff <= 0) {
      setCountdownExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  const showresults=()=>{
    console.log("hello");
    navigate("/")
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    const timer = setInterval(() => {
      const endTimeObj = new Date(endtime);
      const currentTime = new Date();
      const timeDiff = endTimeObj - currentTime;

      if (timeDiff <= 0) {
        // Ensure to update state immutably
        updateElectionData((prevData) => {
          const updatedData = [...prevData];
          const pollIndex = updatedData.findIndex((poll) => poll._id === _id);
          if (pollIndex !== -1) {
            updatedData[pollIndex] = { ...updatedData[pollIndex], timeup: true, completed: participatedList.includes(currentUser) };
          }
          return updatedData;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endtime, _id, currentUser, participatedList, updateElectionData]);

  return (
    <div className="election-card">
      <div className="left-section">
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="datee" style={{ fontSize: '18px' }}>{`Started on: ${new Date(starttime).toLocaleString()}`}</p>
        <p className="datee" style={{ fontSize: '18px' }}>{`End Time: ${new Date(endtime).toLocaleString()}`}</p>
      </div>
      <div className="right-section">
        {!!isCountdownExpired && (
          <div className="countdown">
            <p style={{ fontSize: '30px', marginTop: '10px' }}>Time's Up</p>
          </div>
        )}
        {!isCountdownExpired && (
          <div className="countdown" style={{ marginTop: '30px' }}>
            <p style={{ fontSize: '20px' }}>Countdown Time</p>
            <div className="countdown-timer">
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
            </div>
          </div>
        )}
        <div className="buttons">
          {!participatedList.includes(currentUser) && (
            <button
              className="vote-button"
              disabled={isCountdownExpired}
              style={{ backgroundColor: isCountdownExpired ? 'grey' : '#9333EA' }}
              onClick={() => navigate(`/partpoll/${_id}`)}
            >
              Poll Now
            </button>
          )}
          { participatedList.includes(currentUser) && (
            <button className="vote-button" disabled={isCountdownExpired} style={{ backgroundColor: isCountdownExpired ? 'grey' : '#9333EA' }}>
              Submitted
            </button>
          )}
          <button
            className="submit-button"
            disabled={!participatedList.includes(currentUser) && !isCountdownExpired}
            style={{ backgroundColor: (!participatedList.includes(currentUser) && !isCountdownExpired) ? 'grey' : '#9333EA' }}
            onClick={()=>{navigate("/pollresults/"+_id)}}
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
};

const PollHistory = () => {
  const [electionData, setElectionData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [currentUser, setCurrentUser] = useState("");
  const [participatedList, setParticipatedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/partpolls")
      .then(res => {
        //console.log('Full response:', res.data);
  
        // Assuming res.data[0] is an array of polls
        setElectionData(res.data[0]);
  
        // Assuming res.data[1] is the current user email
        setCurrentUser(res.data[1]);
  
        // Assuming res.data[0] contains an array of polls with 'participated' property
        setParticipatedList(res.data[0].map(poll => poll.participated));
      })
      .catch(err => console.log(err));
  }, []);
  
  
  
  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value === "" ? "" : value === "true");
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTimeFilter(value === "" ? "" : value === "true");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateElectionData = (updatedData) => {
    setElectionData(updatedData);
  };

  const filteredElections = electionData
    .filter((election) => election.title && election.title.includes(searchTerm))
    .filter((election) => timeFilter === '' || Boolean(timeFilter) === election.timeup)
    .filter((election) => statusFilter === '' || Boolean(statusFilter) === election.completed);

  return (
    <div className="pollhistory-main">
      <div style={{ marginLeft: '6%', marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
        <TfiInfoAlt style={{ display: 'inline', margin: '10px', color: 'red', marginTop: "2px" }} size={20} />
        <h4 style={{ display: 'inline' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum esse modi necessitatibus laborum aliquam impedit, atque animi maxime ad cumque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quo..</h4>
      </div>
      <div style={{ display: 'flex', width: "80vw", marginTop: "50px", marginBottom: '50px', marginLeft: '20vw', justifyContent: 'flex-start' }}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by election title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className='sen'
          />
        </div>
        <div style={{ display: 'inline', marginLeft: '50px' }}>
          <div className="custom-select">
            <select value={statusFilter} onChange={handleStatusChange} className='sen'>
              <option value="">All</option>
              <option value={true}>Completed</option>
              <option value={false}>Not Completed</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'inline', marginLeft: '50px' }}>
          <div className="custom-select">
            <select value={timeFilter} onChange={handleTimeChange} className='sen'>
              <option value="">All</option>
              <option value={false}>Time is there</option>
              <option value={true}>Time's up</option>
            </select>
          </div>
        </div>
      </div>

      {filteredElections.map((election) => (
        <ElectionCard
          key={election._id}
          electionData={electionData}
          updateElectionData={updateElectionData}
          title={election.title}
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, illo!'
          starttime={election.starttime}
          endtime={election.endtime}
          _id={election._id}
          currentUser={currentUser}
          participatedList={election.participated}
        />
      ))}
    </div>
  );
};

export default PollHistory;
