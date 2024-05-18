// VotingReview.js

import React,{useContext, useEffect, useState} from 'react';
import './VotingReview.css';
import img1 from "../../../../staticImages/CandidateA.jpg"
import img2 from "../../../../staticImages/CandidateB.jpg"
import img3 from "../../../../staticImages/CandidateC.jpg"
import img4 from "../../../../staticImages/CandidateD.jpg"
import { useNavigate } from 'react-router-dom';
import {Context} from "../../../../utils/context"
import axios from 'axios';
const VotingReview = () => {
  const {vote_id,vote_setId}=useContext(Context)
  const navigate=useNavigate();
  // const [voteDetails,setVoteDetails] =useState( {
  //   name: 'General Election',
  //   startTime: '2023-01-01T10:30:00',
  //   endTime: '2023-01-31T18:45:30',
  //   voterslist: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  //   question: 'Who should be the next president?',
  //   options: [
  //     { name: 'Candidate A', image:img1 },
  //     { name: 'Candidate B', image:img2 },
  //     { name: 'Candidate C', image: img3 },
  //     { name: 'Candidate D', image: img4 }
  //   ],
  // });
useEffect(() => {
  console.log(vote_id)
  
  
}, [])

  const handleSubmit = () => {
    axios.post("http://localhost:3001/vote",vote_id)
    .then(result=>{console.log(result)})
    .catch(err=>console.log(err));
    // console.log('Form submitted!');
    // console.log("helllll")
    navigate("/history");
  };

  return (
    <div className="voting-review">
      <h1>Voting Review - {vote_id.title}</h1>

      <div className="vote-details">
        <p>
          <strong>Start Time:</strong> {new Date(vote_id.starttime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {new Date(vote_id.endtime).toLocaleString()}
        </p>
      </div>

      <div className="voters-list">
        <h2>Voters:</h2>
        <ul>
          {vote_id.voterslist.map((voter, index) => (
            <li key={index}>{voter}</li>
          ))}
        </ul>
      </div>

      <div className="question">
        <h2>Question:</h2>
        <p>{vote_id.questions.question}</p>
      </div>

      <div className="options">
        <h2>Options:</h2>
        <ul>
          {vote_id.questions.options.map((option, index) => (
            <li key={index}>
              <div className="candidate">
                <img src={option.img} alt={option.option} />
                <p>{option.option}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Create Election
      </button>
    </div>
  );
};

export default VotingReview;
