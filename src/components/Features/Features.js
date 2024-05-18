import React from "react";
import img from "../../staticImages/UI1.png";
import img2 from '../../staticImages/BallotBox.png';
import img3 from '../../staticImages/lock.jpg';
import img4 from '../../staticImages/poll1.png'
import './Features.css'
function Features() {
  return (
    <div style={{position:'relative',left:'0px'}} className="mainnn">
        <h1>Our Features</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <a
          href="/"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="img-hover-zoom img-hover-zoom--xyz">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            style={{height:'300px',width:'500px'}}
            src={img2}
            alt=""
          ></img>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Cast Your Vote
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Exercise your democratic right with our user-friendly voting system, ensuring your voice is heard.
            </p>
          </div>
        </a>
        <a
          href="/"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="img-hover-zoom img-hover-zoom--xyz">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            style={{height:'300px',width:'600px'}}
            src={img4}
            alt=""
          ></img>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Engaging Polls
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Empower your community by easily creating and sharing polls, fostering meaningful discussions and informed decisions.
            </p>
          </div>
        </a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        
        <a
          href="/"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="img-hover-zoom img-hover-zoom--xyz">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            style={{height:'300px',width:'800px'}}
            src={img}
            alt=""
          ></img>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Seamless User Experience
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Navigate effortlessly through our platform with an intuitive and user-friendly interface, making your voting and polling experience smooth and enjoyable.
            </p>
          </div>
        </a>
        <a
          href="/"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="img-hover-zoom img-hover-zoom--xyz">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            style={{height:'300px',width:'700px'}}
            src={img3}
            alt=""
          ></img>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Fortified Security Measures
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Rest assured as we prioritize the security and privacy of your data, implementing robust measures to protect every vote and user interaction.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Features;
