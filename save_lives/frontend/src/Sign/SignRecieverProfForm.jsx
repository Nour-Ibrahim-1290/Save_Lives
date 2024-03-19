import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";



export const SignRProfForm = (props) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    console.log("Inside handleSubmit");
    e.preventDefault();
  
    // Create a FormData instance
    const formData = new FormData(e.target);
  
    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());
    data.user_type = 'receiver';
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register/',
            JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
      });
  
      if (response.status === 201) {
        navigate('/login');
      } else {
        // Handle successful request but status code is not 201
        setError(`Request was successful but status code is not 201: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError("There's a record with email in the database, please login or use another email.");
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error in setting up the request: ${error.message}`);
      }
    }
  };

  return (
    <div id="signrp" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Medical Professional Register</h2>
          <p>
           To Help you help others, we'll ask you for some information.
          </p>
        </div>
        <form name="sentMessage" validate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
            <div className="form-group">
                <label htmlFor="name" className='form-label'>Enter your full name:</label>
                <input
                  type="text"
                  id="rprname"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
              <label htmlFor="email" className='form-label'>Enter your email address:</label>
                <input
                  type="email"
                  id="rpremail"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="age" className='form-label'>Enter your age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className='form-label'>Enter your phone number:</label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="phone"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="password" className='form-label'>Enter your account's password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="password" className='form-label'>Enter your account's password:</label>
                <input
                  type="password"
                  id="passwordcheck"
                  name="passwordcheck"
                  className="form-control"
                  placeholder="repeat password"
                  required
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="profession" className='form-label'>
                        What is your profession in the medical field?</label>
                <select
                    id="profession"
                    name="profession"
                    className="form-control"
                    required
                    
                  >
                    <option value="">Select...</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="lab">Laboratory Professional</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="adminstartion">Administration</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="workplace_type" className='form-label'>
                        What type of medical institution are you working in?</label>
                <select
                    id="workplace_type"
                    name="workplace_type"
                    className="form-control"
                    required
                    
                  >
                    <option value="">Select...</option>
                    <option value="hospital_private">Private Hospital</option>
                    <option value="hospital_public">Public Hospital</option>
                    <option value="clinic_private">Private Clinic</option>
                    <option value="clinic_public">Public Clinic</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="workplace_name" className='form-label'>Work Place Name:</label>
                <input
                  type="text"
                  id="workplace_name"
                  name="workplace_name"
                  className="form-control"
                  placeholder="Work Place Name"
                  required
                 
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="workplace_address" className='form-label'>Work Place Address:</label>
                <input
                  type="address"
                  id="workplace_address"
                  name="workplace_address"
                  className="form-control"
                  placeholder="Work Place Address"
                  required
                 
                />
                <p className="help-block text-danger"></p>
              </div>
              
              <div className="form-group">
                <label htmlFor="add_info" className='form-label'>
                        What else would you like us to know?</label>
                  <textarea
                    id="add_info"
                    name="add_info"
                    className="form-control"
                    rows="5"
                   
                  />
                <p className="help-block text-danger"></p>
              </div>
            </div>
          </div>
          <div id="success"></div>
          <button type="submit" className="btn btn-custom btn-lg">
            Resgiter as Medical Professional
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Do you have an account already?
          <Link className="underline" to="/login" style={{ marginLeft: '10px' }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}