// VotingReview.js

import React,{useContext} from 'react';
import './PollReview.css';
import { Context } from '../../../../utils/context'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const VotingReview = () => {
  const {poll_id,setId}=useContext(Context);
  const navigate=useNavigate();
  // const voteDetails = {
  //   name: "Today's Poll",
  //   startTime: '2023-01-01T10:30:00',
  //   endTime: '2023-01-31T18:45:30',
  //   voters: ['John Doe', 'Jane Smith', 'Bob Johnson'],
  //   questions: [
  //     {
  //       question: 'What is your preferred method of relaxation after a long day?',
  //       options: [
  //           'Reading a book or engaging in a favorite hobby.',
  //           'Watching a movie or TV show.',
  //           'Exercising or going for a walk.',
  //           'Listening to music or podcasts.'],
  //     },
  //     {
  //       question: 'Which social media platform do you use most frequently?',
  //       options: ['Facebook',
  //           'Instagram',
  //           'Twitter',
  //           'TikTok'],
  //     },
  //     {
  //       question: 'Which type of vacation destination appeals to you the most?',
  //       options: ['Adventure travel for activities like zip-lining and rafting.',
  //           'Cultural city exploration for history and art.',
  //           'Mountain retreat for hiking and scenic views.',
  //           'Beach resort for sun and relaxation.'],
  //     },
  //     // Add more questions as needed
  //   ],
  // };

  const handleSubmit = () => {
    axios.post("http://localhost:3001/polls",poll_id)
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
    // console.log('Form submitted!');
    // console.log("helllll")
    navigate("/history");
  };

  return (
    <div className="voting-review">
      <h1>Poll Review - {poll_id.title}</h1>

      <div className="vote-details">
        <p>
          <strong>Start Time:</strong> {new Date(poll_id.starttime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {new Date(poll_id.endtime).toLocaleString()}
        </p>
      </div>

      <div className="voters-list">
        <h2>Voters:</h2>
        <ul>
          {poll_id.voterslist.map((voter, index) => (
            <li key={index}>{voter}</li>
          ))}
        </ul>
      </div>

      {poll_id.questions.map((question, qIndex) => (
        <div key={qIndex} className="question">
          <h2>{`Question ${qIndex + 1}: ${question.question}`}</h2>
          <ul>
            {question.options.map((option, oIndex) => (
              <li key={oIndex}>
                <div className="candidate">
                  <p>{option.option}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className="submit-button" onClick={handleSubmit}>
        Create Poll
      </button>
    </div>
  );
};

export default VotingReview;
