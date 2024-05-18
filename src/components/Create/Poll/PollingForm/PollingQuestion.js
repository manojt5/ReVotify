// PollQuestionForm.js

import React, { useState,useContext } from "react";
import {Context} from "../../../../utils/context";
import { useNavigate } from "react-router-dom";
// function PollQuestionForm() {
//   const [questions, setQuestions] = useState([{ question: "", options: [{}] }]);
//   const navigate=useNavigate();
//   const {poll_id,poll_setId}=useContext(Context);
//   const handleQuestionChange = (e, questionIndex) => {
//     const { name, value } = e.target;
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex][name] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (e, questionIndex, optionIndex) => {
//     const { value } = e.target;
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex].option = value;
//     updatedQuestions[questionIndex].options[optionIndex].responses = 0;
//     setQuestions(updatedQuestions);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { question: "", options: [{}]}]);
//   };

//   const handleRemoveQuestion = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(questionIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const handleAddOption = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     if (updatedQuestions[questionIndex].options.length < 4) {
//       updatedQuestions[questionIndex].options.push({});
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleRemoveOption = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...questions];
//     if (updatedQuestions[questionIndex].options.length > 2) {
//       updatedQuestions[questionIndex].options.splice(optionIndex, 1);
//       setQuestions(updatedQuestions);
//     }
//   };

//   const handleSubmit = () => {
//     // Add your submit logic here
//     poll_setId((prevId)=>({...prevId,questions:questions}))
//     console.log(poll_id)
//     navigate("/pollreview")
//     // console.log("Form submitted:", questions);
//   };

//   return (
//     <form>
//       {questions.map((question, questionIndex) => (
//         <div
//           key={questionIndex}
//           className="mb-8 p-8 border-2 border-purple-700 rounded"
//         >
//           <label
//             className="block mb-2 text-purple-700 font-bold"
//             htmlFor={`question-${questionIndex}`}
//           >
//             Question:
//           </label>
//           <input
//             type="text"
//             id={`question-${questionIndex}`}
//             name="question"
//             value={question.question}
//             onChange={(e) => handleQuestionChange(e, questionIndex)}
//             className="w-full p-2 border rounded"
//           />

//           <div className="mt-4">
//             {question.options.map((option, optionIndex) => (
//               <div key={optionIndex} className="mb-4">
//                 <label
//                   className="block mb-2 text-purple-700 font-bold"
//                   htmlFor={`option-${questionIndex}-${optionIndex}`}
//                 >
//                   Option {optionIndex + 1}:
//                 </label>
//                 <input
//                   type="text"
//                   id={`option-${questionIndex}-${optionIndex}`}
//                   name="option"
//                   // value={option}
//                   onChange={(e) =>
//                     handleOptionChange(e, questionIndex, optionIndex)
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//                 {question.options.length > 2 && (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleRemoveOption(questionIndex, optionIndex)
//                     }
//                     className="bg-purple-700 text-white py-2 px-4 rounded mt-2"
//                   >
//                     Remove Option
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={() => handleAddOption(questionIndex)}
//             className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
//           >
//             Add Option
//           </button>

//           {questions.length > 1 && (
//             <button
//               type="button"
//               onClick={() => handleRemoveQuestion(questionIndex)}
//               className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
//             >
//               Remove Question
//             </button>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={handleAddQuestion}
//         className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
//       >
//         Add Question
//       </button>

//       <button
//         type="button"
//         onClick={handleSubmit}
//         className="bg-purple-700 text-white py-2 px-4 rounded mt-4"
//       >
//         Submit
//       </button>
//     </form>
//   );
// }

// export default PollQuestionForm;
function PollQuestionForm() {
  const [questions, setQuestions] = useState([{ question: "", options: [{ option: "", responses: 0 }] }]);
  const navigate = useNavigate();
  const { poll_id, poll_setId } = useContext(Context);

  const handleQuestionChange = (e, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].option = value;
    updatedQuestions[questionIndex].options[optionIndex].responses = 0;
    setQuestions(updatedQuestions);
    console.log(questions)
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: [{ option: "", responses: 0 }] }]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length < 4) {
      updatedQuestions[questionIndex].options.push({ option: "", responses: 0 });
      setQuestions(updatedQuestions);
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };
  const handleSubmit = () => {
    // Validate the questions format before submitting
    const isValidFormat = questions.every(
      (question) =>
        question.hasOwnProperty('question') &&
        Array.isArray(question.options) &&
        question.options.every(
          (option) =>
            option.hasOwnProperty('option') &&
            option.hasOwnProperty('responses')
        )
    );
  
    if (!isValidFormat) {
      console.error('Invalid questions format');
      return;
    }
  
    // Continue with your submit logic here
    poll_setId((prevId) => ({ ...prevId, questions: questions }));
    console.log(poll_id);
    navigate('/pollreview');
  };

  return (
    <form>
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="mb-8 p-8 border-2 border-purple-700 rounded"
        >
          <label
            className="block mb-2 text-purple-700 font-bold"
            htmlFor={`question-${questionIndex}`}
          >
            Question:
          </label>
          <input
            type="text"
            id={`question-${questionIndex}`}
            name="question"
            value={question.question}
            onChange={(e) => handleQuestionChange(e, questionIndex)}
            className="w-full p-2 border rounded"
          />

          <div className="mt-4">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-4">
                <label
                  className="block mb-2 text-purple-700 font-bold"
                  htmlFor={`option-${questionIndex}-${optionIndex}`}
                >
                  Option {optionIndex + 1}:
                </label>
                <input
                  type="text"
                  id={`option-${questionIndex}-${optionIndex}`}
                  name="option"
                  value={option.option}
                  onChange={(e) =>
                    handleOptionChange(e, questionIndex, optionIndex)
                  }
                  className="w-full p-2 border rounded"
                />
                {question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveOption(questionIndex, optionIndex)
                    }
                    className="bg-purple-700 text-white py-2 px-4 rounded mt-2"
                  >
                    Remove Option
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAddOption(questionIndex)}
            className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
          >
            Add Option
          </button>

          {questions.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveQuestion(questionIndex)}
              className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
            >
              Remove Question
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-purple-700 text-white py-2 px-4 rounded mt-4 mr-4"
      >
        Add Question
      </button>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-purple-700 text-white py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
}

export default PollQuestionForm;
