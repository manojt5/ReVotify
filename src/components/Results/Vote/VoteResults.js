import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./VoteResults.css";

const VoteResults = () => {
  const [voteData, setVoteData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the /vote/:id endpoint
    axios
      .get(`http://localhost:3001/vote/${id}`)
      .then((response) => {
        const data = response.data;
        setVoteData(data);
        triggerConfetti(); // Trigger confetti effect after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Function to trigger confetti effect
    const triggerConfetti = () => {
      confetti({
        particleCount: 1000,
        spread: 150,
      });
    };
  }, [id]); // Include 'id' in the dependency array to fetch data when 'id' changes

  return (
    <div className="vote-results-container">
      {/* Top three podiums */}
      <div className="podium-row">
        {/* Second place */}
       {/* Second place */}
{voteData &&
  voteData.questions.options[1] && ( // Check if the second option exists
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="podium-image">
        <img
          src={voteData.questions.options[1].img}
          alt={voteData.questions.options[1].option}
          width="150"
          height="150"
          className="candidate-image"
        />
      </div>
      <div className="podium podium-second">
        <div className="podium-info text-center">
          <h2 className="text-2xl font-bold">
            {voteData.questions.options[1].option}
          </h2>
          <p className="text-gray-500">
            {voteData.questions.options[1].responses} votes
          </p>
        </div>
      </div>
    </div>
  )}


        {/* Winner */}
        {/* Winner */}
{voteData &&
  voteData.questions.options[0] && ( // Check if the first option exists
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="podium-image">
        <img
          src={voteData.questions.options[0].img}
          alt={voteData.questions.options[0].option}
          width="200"
          height="200"
          className="candidate-image"
        />
      </div>
      <div className="podium podium-winner">
        <div className="podium-info text-center">
          <h2 className="text-2xl font-bold">
            {voteData.questions.options[0].option}
          </h2>
          <p className="text-gray-500">
            {voteData.questions.options[0].responses} votes
          </p>
        </div>
      </div>
    </div>
  )}

{/* Third place */}
{voteData &&
  voteData.questions.options[2] && ( // Check if the third option exists
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="podium-image">
        <img
          src={voteData.questions.options[2].img}
          alt={voteData.questions.options[2].option}
          width="100"
          height="100"
          className="candidate-image"
        />
      </div>
      <div className="podium podium-third">
        <div className="podium-info text-center">
          <h2 className="text-2xl font-bold">
            {voteData.questions.options[2].option}
          </h2>
          <p className="text-gray-500">
            {voteData.questions.options[2].responses} votes
          </p>
        </div>
      </div>
    </div>
  )}
</div>


      {/* Remaining candidates */}
      <ul className="podium-list">
      {voteData &&
  voteData.questions.options.length > 3 && (
    <ul className="podium-list">
      {voteData.questions.options.slice(3).map((candidate, index) => (
        <li key={candidate._id} className="podium-item">
          <div className="podium-image">
            <img
              src={candidate.img}
              alt={candidate.option}
              width="100"
              height="100"
              className="candidate-image"
            />
          </div>
          <div className="podium-info text-center">
            <h3 className="text-xl font-bold">{candidate.option}</h3>
            <p className="text-gray-500">{candidate.responses} votes</p>
          </div>
        </li>
      ))}
    </ul>
  )}

      </ul>
    </div>
  );
};

export default VoteResults;
