import React from 'react'
import img1 from '../../staticImages/AboutUs.png'
import './AboutUs.css'
function AboutUs() {
  return (
    <div className='root'>
      <div className='heading'>
        <h1 style={{ fontSize: '48px' }}>ABOUT US</h1>
      </div>
      <div className='main'>
        <div className='imgcon'>
          <img src={img1} style={{ height: '400px', width: 'auto' }}></img>
        </div>
        <div className='data'>
          <h1>Empowering Worldwide Participation, Shaping an Inclusive Future</h1>
          We are dedicated to empowering individuals worldwide through a digital platform that facilitates democratic participation and the expression of diverse opinions.Our vision is to create a globally inclusive community where diverse perspectives come together to shape the future through informed and democratic decision-making.

        </div>
      </div>

    </div>
  )
}

export default AboutUs