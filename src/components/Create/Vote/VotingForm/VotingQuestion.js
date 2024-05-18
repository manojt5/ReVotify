import React, { useState, useContext } from "react";
import { Context } from "../../../../utils/context";
import { useNavigate } from "react-router-dom";

function VoteQuestionForm() {
  const [questions, setQuestions] = useState({
    question: "",
    options: [
      {
        img: "https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
        option: "",
        responses: 0,
      },
    ],
  });

  const navigate = useNavigate();
  const { vote_id, vote_setId } = useContext(Context);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, optionIndex) => {
    const { value } = e.target;
    setQuestions((prevQuestions) => {
      const updatedOptions = [...prevQuestions.options];
      updatedOptions[optionIndex].option = value;
      return {
        ...prevQuestions,
        options: updatedOptions,
      };
    });
  };

  const addOption = () => {
    setQuestions((prevQuestions) => {
      const currentOptions = [...prevQuestions.options];
      if (currentOptions.length < 26) {
        const newOptions = [
          ...currentOptions,
          {
            img: "https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
            option: "",
            responses: 0,
          },
        ];
        return {
          ...prevQuestions,
          options: newOptions,
        };
      }
      return prevQuestions;
    });
  };

  const handleRemoveOption = (optionIndex) => {
    setQuestions((prevQuestions) => {
      const currentOptions = [...prevQuestions.options];
      if (currentOptions.length > 1) {
        currentOptions.splice(optionIndex, 1);
        return {
          ...prevQuestions,
          options: currentOptions,
        };
      }
      return prevQuestions;
    });
  };

  const handleSubmit = () => {
    vote_setId((prevId) => ({ ...prevId, questions: questions }));
    // console.log(poll_id);
    console.log(vote_id)
    // console.log(questions);
    navigate("/votereview");
  };

  return (
    <form>
      <div className="mb-8 p-8 border-2 border-purple-700 rounded">
        <label
          className="block mb-2 text-purple-700 font-bold"
          htmlFor="question"
        >
          Question:
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={questions.question}
          onChange={handleQuestionChange}
          className="w-full p-2 border rounded"
        />

        <div className="mt-4">
          {questions.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-4">
              <label
                className="block mb-2 text-purple-700 font-bold"
                htmlFor={`option-${optionIndex}`}
              >
                Option {optionIndex + 1}:
              </label>
              <input
                type="text"
                id={`option-${optionIndex}`}
                name={`option-${optionIndex}`}
                value={option.option}
                onChange={(e) => handleOptionChange(e, optionIndex)}
                className="w-full p-2 border rounded"
              />
              {questions.options.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(optionIndex)}
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
          onClick={addOption}
          className="bg-purple-700 text-white py-2 px-4 rounded mt-4"
        >
          Add Option
        </button>
      </div>

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

export default VoteQuestionForm;
