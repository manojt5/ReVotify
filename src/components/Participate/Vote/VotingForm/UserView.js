import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
// import { setTimeout } from "timers/promises";

function Userview() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [questionData, setQuestionData] = useState(null);
  const [data, setData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the /vote/:id endpoint
    axios
      .get(`https://votify-back.vercel.app/vote/${id}`)
      .then((response) => {
        const data = response.data;
        setData(data);
        setQuestionData(data.questions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleRadioChange = (candidate) => {
    console.log(candidate)
    setSelectedCandidate(candidate);
  };
const handleVote1=()=>{
  const updatedOptions = questionData.options.map((option) => {
    if (option.option === selectedCandidate) {
      console.log("Incrementing responses for selected option:", option.option);
      return { ...option, responses: option.responses + 1 };
    }
    return option;
  });
  setTimeout(() => {
    console.log(questionData)
  }, 10000);

  // Log the updated options
  console.log("Updated Options:", updatedOptions);

  // Update the questionData with the modified options
  setQuestionData((prevData) => ({
    ...prevData,
    options: updatedOptions,
  }));
  setTimeout(() => {
    console.log(questionData)
  }, 10000);
  // Log the updated questionData
  console.log("Updated Question Data:", questionData);
}
  // const handleVote = async () => {
  //   // Add logic to increment the responses count for the selected option
  //   handleVote1()
  //   // Perform the API call when data is updated
  //   const userEmail = JSON.parse(sessionStorage.getItem('user'))?.email;
  //   try {
  //     const res = await axios.put(`http://localhost:3001/vote/${id}`, { data: { ...data, questions: questionData },email:userEmail }, {
  //       timeout: 10000 // 10 seconds timeout
  //   });
  //     console.log("API Response:", res);
  //   } catch (err) {
  //     console.log("API Error:", err);
  //   }
  
  //   // Redirect to the results page or perform other actions
  //   navigate(`/votehistory`);
  // };
  const handleVote = async () => {
    // Add logic to increment the responses count for the selected option
    handleVote1();

    // Perform the API call when data is updated after a 10-second delay
    const userEmail = JSON.parse(sessionStorage.getItem('user'))?.email;

    setTimeout(async () => {
        try {
            const res = await axios.put(`https://votify-back.vercel.app/vote/${id}`, { 
                data: { ...data, questions: questionData },
                email: userEmail 
            }, {
                timeout: 10000 // 10 seconds timeout for the request
            });
            console.log("API Response:", res);
        } catch (err) {
            console.log("API Error:", err);
        }

        // Redirect to the results page or perform other actions
        navigate(`/votehistory`);
    }, 10000); // 10 seconds delay
};

  
  

  // Log the current state outside the handleVote function
  // console.log("Current State - Question Data:", questionData);
  // console.log("Current State - Data:", data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <span>
          {questionData && (
            <div className={"mt-6"}>
              <h1 className="text-2xl font-semibold mb-4">
                {questionData.question}
              </h1>
              {questionData.options.map((option) => (
                <div key={option._id} className="mb-6">
                  <label
                    className={`block cursor-pointer p-2 ${
                      selectedCandidate === option.option ? "bg-purple-100" : ""
                    }`}
                  >
                    <table className="w-full border-collapse table-auto">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="p-2">
                            <img
                              src={option.img}
                              alt={option.option}
                              className="w-64 h-64 object-cover rounded-lg"
                            />
                          </td>
                          <td className="p-2 text-xl font-semibold">
                            {option.option}
                          </td>
                          <td className="p-2 hidden">
                            <input
                              type="radio"
                              name="candidate"
                              value={option.option}
                              checked={selectedCandidate === option.option}
                              onChange={() => handleRadioChange(option.option)}
                              className="border-2 border-gray-300 text-gray-600 py-2 px-4 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </label>
                </div>
              ))}
            </div>
          )}

          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-8"
            onClick={handleVote}
          >
            Vote
          </button>
        </span>
      </div>
    </div>
  );
}

export default Userview;
