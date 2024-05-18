import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../../../utils/context"; 
import * as XLSX from 'xlsx';
const PollDetails = () => {
  const navigate = useNavigate();
  const [file,setFile]=useState(null);
  const{poll_id,poll_setId,user}=useContext(Context);
  // const {voter}
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    poll_setId((prevId) => ({
      ...prevId,
      title: newTitle,
    }));
    
  };
  const handlestarttimechange=(e)=>{
    const newTime=e.target.value;
    poll_setId((prevId)=>({...prevId,starttime:newTime}));
  }
  const handleendtimechange=(e)=>{
    const newtime=e.target.value;
    poll_setId((prevId)=>({...prevId,endtime:newtime}))
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate("/pollingform")
    console.log(poll_id);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet is the relevant one
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Find the index of the "email" header
      const emailIndex = jsonData[0].indexOf('email');

      // Extract voter emails
      const voterEmails = jsonData.slice(1).map((row) => row[emailIndex]); //this is array of emailids
      poll_setId((prevId)=>({...prevId,voterslist:voterEmails}))
      console.log('Extracted Emails:', voterEmails);
    };

    reader.readAsArrayBuffer(file);
  };


  return (
    <div className="flex flex-col items-center justify-start h-screen mt-20 ">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
      {/* {user !== "" ? ( */}
  <form className="space-y-6" noValidate>
    <div>
      <label htmlFor="voteTitle" className="block text-sm font-medium text-gray-700">
        Poll Title
      </label>
      <input
        type="text"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        id="voteTitle"
        name="voteTitle"
        placeholder="Example: 2023 Board of Directors Election"
        value={poll_id.title} // Set the input value to the current title in the context
        onChange={handleTitleChange}
        required
      />
    </div>
    <div className="items-center">
      <div htmlFor="stVote2" className="ml-2 mb-4" style={{ fontWeight: 'bolder' }}>
        Schedule a Start and End time
      </div>

      <div className="input-group ml-2 flex">
        <input
          type="datetime-local"
          className="form-input"
          id="dateInputStart"
          placeholder="Start Date and Time"
          onChange={handlestarttimechange}
        />
        <div style={{ margin: '0px 50px' }}>To</div>
        <input
          type="datetime-local"
          className="form-input"
          id="dateInputEnd"
          placeholder="End Date and Time"
          onChange={handleendtimechange}
        />
      </div>
    </div>

    <div className="text-gray-500">Date when voting closes for voters...</div>

    <div className="input-group">
      <input
        type="file"
        className="form-input"
        id="inputGroupFile02"
        onChange={(e) => {
          handleFileChange(e);
          handleFileRead(e);
        }}
      />

      <label className="input-group-text" htmlFor="inputGroupFile02">
        Upload
      </label>
    </div>
    <div className="text-gray-500">Choose a participants file with the following format...</div>

    <button
      type="submit"
      className="w-full py-2 px-4 text-white rounded-md"
      style={{ backgroundColor: '#9333ea' }}
      onClick={handleButtonClick}
    >
      Create Poll
    </button>
  </form>
{/* ) : (
  <div>Create an account</div>
)} */}

      </div>
    </div>
  );
};

export default PollDetails;