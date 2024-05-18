import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./ContactUs.scss"
function ContactUs() {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    complaint: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        data: {
          complaint: formData.complaint,
          phoneNumber: formData.phoneNumber,
          name: formData.name,
          email: formData.email
        }
      };
      navigate("/success")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='comp'>
        <div className='image-container'>
        <img
          src='https://st3.depositphotos.com/1001877/32125/i/450/depositphotos_321258156-stock-photo-contact-us-website-page-on.jpg'
          alt='Complaint Image'
        />
      </div>
      <div className='form'>
      <h2>Contact Us</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="phoneNumber">Mobile Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor='complaint'>Message:</label>
            <textarea
              id='complaint'
              name='complaint'
              value={formData.complaint}
              onChange={handleChange}
              required
            ></textarea>
          <br/>
          <br/>
          <button type="submit">Submit</button>
        </div>

       

        
      </form>
      </div>
    </div>
  );
}

export default ContactUs;
