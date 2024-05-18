// import React, { useEffect, useRef } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import './Pollresults.css';
// import { useNavigate,useParams } from 'react-router-dom';

// const ResultsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {pollData,setpolldata}=useState([
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
//       ]
//     }
//   ])
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/polls/${id}`)
//       .then((res) => {
//         console.log(res.data);
//         setpolldata(res.data.questions);
        
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);
//   // const pollData = [
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
//   //     ]
//   //   }
//   // ];

//   const getTotalResponses = (question) => {
//     return question.options.reduce((total, option) => total + option.responses, 0);
//   };

//   return (
//     <div className="resultspoll">
//       {pollData.map((question, index) => (
//         <div key={index} className="question-container">
//           <div className="question-text">
//             <h2>{question.question}</h2>
//           </div>
//           {question.options.map((option, optionIndex) => (
//             <Option key={optionIndex} option={option} totalResponses={getTotalResponses(question)} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Option = ({ option, totalResponses }) => {
//   const optionBarRef = useRef(null);

//   useEffect(() => {
//     const initialWidth = 30;
//     const calculatedWidth = (option.responses / totalResponses) * 100;
//     optionBarRef.current.style.width = `${initialWidth}px`;
//     setTimeout(() => {
//       optionBarRef.current.style.width = `${calculatedWidth+initialWidth}%`;
//     }, 550);
//   }, [option.responses, totalResponses]);

//   return (
//     <div className="option-container" style={{textAlign:'left'}}>
//       <div className="option-label" style={{textAlign:'left',zIndex:'100'}}>{option.option}</div>
//       <div className="option-bar" ref={optionBarRef} style={{backgroundColor:"#9333ea",textAlign:'center'}}>
//         <div className="bar-label" style={{textAlign:'left'}}>{option.responses}{" "}
//          ({((option.responses / totalResponses) * 100).toFixed(2)}%)
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Pollresults.css';
import { useNavigate, useParams } from 'react-router-dom';

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pollData, setPollData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/polls/${id}`)
      .then((res) => {
        console.log(res.data);
        setPollData(res.data.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getTotalResponses = (question) => {
    return question.options.reduce((total, option) => total + option.responses, 0);
  };

  return (
    <div className="resultspoll">
      {pollData.map((question, index) => (
        <div key={index} className="question-container">
          <div className="question-text">
            <h2>{question.question}</h2>
          </div>
          {question.options.map((option, optionIndex) => (
            <Option key={optionIndex} option={option} totalResponses={getTotalResponses(question)} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Option = ({ option, totalResponses }) => {
  const optionBarRef = useRef(null);

  useEffect(() => {
    const initialWidth = 30;
    const calculatedWidth = (option.responses / totalResponses) * 100;

    if (optionBarRef.current) {
      optionBarRef.current.style.width = `${initialWidth}px`;
      setTimeout(() => {
        optionBarRef.current.style.width = `${calculatedWidth + initialWidth}%`;
      }, 550);
    }
  }, [option.responses, totalResponses]);

  return (
    <div className="option-container" style={{ textAlign: 'left' }}>
      <div className="option-label" style={{ textAlign: 'left', zIndex: '100' }}>{option.option}</div>
      <div className="option-bar" ref={optionBarRef} style={{ backgroundColor: "#9333ea", textAlign: 'center' }}>
        <div className="bar-label" style={{ textAlign: 'left' }}>{option.responses}{" "}
          ({((option.responses / totalResponses) * 100).toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

