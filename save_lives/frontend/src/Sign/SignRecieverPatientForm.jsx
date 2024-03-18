import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";



export const SignRPatientForm = (props) => {
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
          <h2>Patient or Family Register</h2>
          <p>
           To Facilitate your journey, we will ask you to provide some specialized information, we'll try our best to help out.
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <form name="sentMessage" validate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
            <div className="form-group">
                <label htmlFor="name" className='form-label'>Enter your full name:</label>
                <input
                  type="text"
                  id="name"
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
                  id="email"
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
                <label htmlFor="allergic" className='form-label'>
                        Do you have any kind of alergies that conflicts with the type pf blood you recieve?</label>
                <select
                    id="allergic"
                    name="allergic"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No, I have not</option>
                    <option value="unknown">I don't really know</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="allergic_details">
                        If you have any allergies, tell us more...</label>
                  <textarea
                    id="allergic_details"
                    name="allergic_details"
                    className="form-control"
                    rows="3"
                  />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="blood_type" className='form-label'>What is your Blood Type?</label>
                <select
                    id="blood_type"
                    name="blood_type"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="permanent_cond" className='form-label'>
                        Is your condition permenant?</label>
                <select
                    id="permanent_cond"
                    name="permanent_cond"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I need blood often</option>
                    <option value="temp">Yes, I will need blood donations for a while</option>
                    <option value="no">No, It's a one time case</option>
                  </select>
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
            Resgiter as Patient or Family
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Do you have an account already?
          <Link className="underline" to="/login" style={{ marginLeft: '10px' }}>
            Login
          </Link>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  </div>
  );
}