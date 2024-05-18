// PollDetailsView.js
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./TaskReview.css"

const PollDetailsView = () => {
//   const { viewid, setViewid } = useContext(PollContext);
  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  useEffect(() => {
    // setViewid(id);

    axios.get(`http://localhost:3001/polls/${id}`)
      .then((response) => {
        setPoll(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching poll details:', error);
      });

    // return () => {
    //   setViewid(null);
    // };
  }, []);

  if (!poll) {
    return <div>Loading...</div>;
  }

  const { title, starttime, endtime, voterslist, questions,type,_id } = poll;

  return (
    <div className="poll-details-container">
        <div className="poll-details-meta">
        <div className="poll-type">Type: {type}</div>
        <div className="poll-id">Poll ID: {_id}</div>
      </div>
      <h2 className="poll-details-title">{title}</h2>
      <div className="poll-details-info">
        <strong>Start Time:</strong> {new Date(starttime).toLocaleString()}
      </div>
      <div className="poll-details-info">
        <strong>End Time:</strong> {new Date(endtime).toLocaleString()}
      </div>
      <div className="poll-details-info">
        <strong>Voters List:</strong>
        <ul className="voters-list">
          {voterslist.map((voter, index) => (
            <li key={index}>{voter}</li>
          ))}
        </ul>
      </div>
      <div className="poll-details-info">
        <strong>Questions:</strong>
        {questions.map((question) => (
          <div key={question._id.$oid}>
            <p className="question">{question.question}</p>
            <ul className="options-list">
              {question.options.map((option, index) => (
                <li key={index}>{option.option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
    </div>


  );
};

export default PollDetailsView;
