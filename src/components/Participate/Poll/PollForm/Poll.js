// import React, { useState } from "react";
// import axios from "axios";
// import { CheckCircle } from "react-feather";
// import { useNavigate,useParams } from "react-router-dom";

// export default function Poll() {
//   const [PollData,setPollData]=useState([
//     {
//       "question": "Favorite Color?",
//       "options": [
//         { "option": "Red", "responses": 150 },
//         { "option": "Blue", "responses": 30 },
//         { "option": "Green", "responses": 60 }
//       ]
//     },
//     {
//       "question": "Favorite Animal?",
//       "options": [
//         { "option": "Dog", "responses": 25 },
//         { "option": "Cat", "responses": 18 },
//         { "option": "Bird", "responses": 15 }
//     ]}
//   ])
//   let  userId  = useParams();
//   console.log(userId.id)
//   axios.get("http://localhost:3001/polls/"+userId.id)
//   .then(res=>{console.log(res.data.questions);setPollData(res.data.questions)})
//   .catch(err=>{console.log(err)})

//   // var PollData = [
//   //   {
//   //     "question": "Favorite Color?",
//   //     "options": [
//   //       { "option": "Red", "responses": 150 },
//   //       { "option": "Blue", "responses": 30 },
//   //       { "option": "Green", "responses": 60 }
//   //     ]
//   //   },
//   //   {
//   //     "question": "Favorite Animal?",
//   //     "options": [
//   //       { "option": "Dog", "responses": 25 },
//   //       { "option": "Cat", "responses": 18 },
//   //       { "option": "Bird", "responses": 15 }
//   //   ]}
//   // ];
//   const navigate = useNavigate();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [hasVoted, setHasVoted] = useState(Array(PollData.length).fill(false));

 

//   const [votes, setVotes] = useState(() => {
//     const initialVotes = {};
//     PollData.forEach((question, qIndex) => {
//       question.options.forEach((option, oIndex) => {
//         initialVotes[`${qIndex + 1}-${oIndex + 1}`] = 0;
//       });
//     });
//     return initialVotes;
//   });

//   const handleSubmit = () => {
//     navigate("/pollresults");
//   };

//   const changeQuestion = () => {
//     if (currentQuestion < PollData.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       // Reset hasVoted for the next question
//       setHasVoted((prev) => {
//         const updatedVotes = [...prev];
//         updatedVotes[currentQuestion] = false;
//         return updatedVotes;
//       });
//     } else {
//       // Use it to connect the pages.
//     }
//   };

//   const voteOption = (qIndex, oIndex) => {
//     // Check if the user has already voted for this question
//     if (!hasVoted[qIndex]) {
//       setVotes((prevVotes) => {
//         const updatedVotes = {
//           ...prevVotes,
//           [`${qIndex + 1}-${oIndex + 1}`]:
//             prevVotes[`${qIndex + 1}-${oIndex + 1}`] + 1,
//         };
//         return updatedVotes;
//       });

//       // Increment the responses for the voted option in PollData
//       const updatedPollData = [...PollData];
//       updatedPollData[qIndex].options[oIndex].responses += 1;

//       // Mark the user as having voted for this question
//       setHasVoted((prev) => {
//         const updatedVotes = [...prev];
//         updatedVotes[qIndex] = true;
//         return updatedVotes;
//       });

//       // Update PollData with the new responses
//       console.log("Updated PollData:", updatedPollData);
//     } else {
//       console.log("You have already voted for this question.");
//       // Optionally, you can show a message to the user indicating that they've already voted for this question.
//     }
//   };

//   const calculatePercentage = (qIndex, oIndex) => {
//     const totalVotes = Object.values(votes).reduce(
//       (acc, curr) => acc + curr,
//       0
//     );
//     return totalVotes === 0
//       ? 0
//       : (votes[`${qIndex + 1}-${oIndex + 1}`] / totalVotes) * 100;
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
//         <div className="mb-6">
//           <span className="text-2xl font-bold text-purple-800">
//             {PollData[currentQuestion].question}
//           </span>
//         </div>
//         <div className="space-y-4">
//           {PollData[currentQuestion].options.map((option, oIndex) => (
//             <div
//               key={oIndex}
//               className={`flex items-center ${
//                 hasVoted[currentQuestion] ? "font-bold" : ""
//               }`}
//             >
//               <div className="flex-grow">{option.option}</div>
//               {hasVoted[currentQuestion] && (
//                 <div className="text-green-500">
//                   <CheckCircle size={20} color="#8e2de2" />
//                 </div>
//               )}
//               {!hasVoted[currentQuestion] && (
//                 <button
//                   type="button"
//                   onClick={() => voteOption(currentQuestion, oIndex)}
//                   className={`bg-purple-800 text-white px-4 py-2 rounded-md ${
//                     hasVoted[currentQuestion]
//                       ? "cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                   // Disable the button after voting
//                   disabled={hasVoted[currentQuestion]}
//                 >
//                   Vote
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 flex justify-between">
//           <button
//             type="button"
//             onClick={changeQuestion}
//             className={`${
//               currentQuestion < PollData.length - 1 ? "block" : "hidden"
//             } bg-purple-800 text-white px-4 py-2 rounded-md`}
//           >
//             Next
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className={`${
//               currentQuestion === PollData.length - 1 ? "block" : "hidden"
//             } bg-purple-800 text-white px-4 py-2 rounded-md`}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";

export default function Poll() {
  const [pollData, setPollData] = useState([
    {
      question: "Favorite Color?",
      options: [
        { option: "Red", responses: 150 },
        { option: "Blue", responses: 30 },
        { option: "Green", responses: 60 },
      ],
    },
    {
      question: "Favorite Animal?",
      options: [
        { option: "Dog", responses: 25 },
        { option: "Cat", responses: 18 },
        { option: "Bird", responses: 15 },
      ],
    },
  ]);
  const [Data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasVoted, setHasVoted] = useState(Array(pollData.length).fill(false));
  const [votes, setVotes] = useState(() => {
    const initialVotes = {};
    pollData.forEach((question, qIndex) => {
      question.options.forEach((option, oIndex) => {
        initialVotes[`${qIndex + 1}-${oIndex + 1}`] = 0;
      });
    });
    return initialVotes;
  });

  useEffect(() => {
    axios
      .get(`https://votify-back.vercel.app/polls/${id}`)
      .then((res) => {
        console.log(res.data);
        setPollData(res.data.questions);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = () => {
    const userEmail = JSON.parse(sessionStorage.getItem('user'))?.email;

    setData((prevId)=>({...prevId,questions:pollData}))
    console.log("final")
    console.log("data",Data)
    axios.put(`https://votify-back.vercel.app/polls/${id}`, {
        Data,
        email: userEmail
    })
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
    navigate(`/pollresults/${id}`);
  };

  const changeQuestion = () => {
    if (currentQuestion < pollData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Reset hasVoted for the next question
      setHasVoted((prev) => {
        const updatedVotes = [...prev];
        updatedVotes[currentQuestion] = false;
        return updatedVotes;
      });
    } else {
      // Use it to connect the pages.
    }
  };

  const voteOption = (qIndex, oIndex) => {
    // Check if the user has already voted for this question
    if (!hasVoted[qIndex]) {
      setVotes((prevVotes) => {
        const updatedVotes = {
          ...prevVotes,
          [`${qIndex + 1}-${oIndex + 1}`]:
            prevVotes[`${qIndex + 1}-${oIndex + 1}`] + 1,
        };
        return updatedVotes;
      });

      // Increment the responses for the voted option in pollData
      const updatedPollData = [...pollData];
      updatedPollData[qIndex].options[oIndex].responses += 1;

      // Mark the user as having voted for this question
      setHasVoted((prev) => {
        const updatedVotes = [...prev];
        updatedVotes[qIndex] = true;
        return updatedVotes;
      });

      // Update pollData with the new responses
      
      setPollData(updatedPollData)
      console.log("Updated pollData:", pollData);
    } else {
      console.log("You have already voted for this question.");
      // Optionally, you can show a message to the user indicating that they've already voted for this question.
    }
  };

  const calculatePercentage = (qIndex, oIndex) => {
    const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);
    return totalVotes === 0
      ? 0
      : (votes[`${qIndex + 1}-${oIndex + 1}`] / totalVotes) * 100;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <div className="mb-6">
          <span className="text-2xl font-bold text-purple-800">
            {pollData[currentQuestion].question}
          </span>
        </div>
        <div className="space-y-4">
          {pollData[currentQuestion].options.map((option, oIndex) => (
            <div
              key={oIndex}
              className={`flex items-center ${
                hasVoted[currentQuestion] ? "font-bold" : ""
              }`}
            >
              <div className="flex-grow">{option.option}</div>
              {hasVoted[currentQuestion] && (
                <div className="text-green-500">
                  <CheckCircle size={20} color="#8e2de2" />
                </div>
              )}
              {!hasVoted[currentQuestion] && (
                <button
                  type="button"
                  onClick={() => voteOption(currentQuestion, oIndex)}
                  className={`bg-purple-800 text-white px-4 py-2 rounded-md ${
                    hasVoted[currentQuestion]
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  // Disable the button after voting
                  disabled={hasVoted[currentQuestion]}
                >
                  Vote
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={changeQuestion}
            className={`${
              currentQuestion < pollData.length - 1 ? "block" : "hidden"
            } bg-purple-800 text-white px-4 py-2 rounded-md`}
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`${
              currentQuestion === pollData.length - 1 ? "block" : "hidden"
            } bg-purple-800 text-white px-4 py-2 rounded-md`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
