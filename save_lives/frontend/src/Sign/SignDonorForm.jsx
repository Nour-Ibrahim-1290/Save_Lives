import React, { useState } from 'react';
import axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";



export const SignDonorForm = (props) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    console.log("Inside handleSubmit");
    e.preventDefault();
  
    // Create a FormData instance
    const formData = new FormData(e.target);
  
    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());
    data.user_type = 'donor';
  
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
    <div id="signd" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Join as Donor</h2>
          <p>
          Welcome to our community, we salute your selfless act, and hope you will only benefit your health out of it.
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
                <label htmlFor="password" className='form-label'>Confirm your password:</label>
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
                <label htmlFor="weight" className='form-label'>Enter your Weight in kg:</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="form-control"
                  placeholder="weight in kg"
                  required
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
                <label htmlFor="donate_blood" className='form-label'>Did you donate your blood before?</label>
                <select
                    id="donate_blood"
                    name="donate_blood"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="once">Yes, once</option>
                    <option value="regular">Yes, servral times</option>
                    <option value="never">No, never before</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="last_donation" className='form-label'>When did you donate your blood last?</label>
                <label htmlFor="last_donation">(answer only if you said yes for the last question)</label>
                <input
                    type="date"
                    id="last_donation"
                    name="last_donation"
                    className="form-control"
                  />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="anemic" className='form-label'>Are you Anemic?</label>
                <select
                    id="anemic"
                    name="anemic"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I'm Anemic</option>
                    <option value="no">No, I'm not Anemic</option>
                    <option value="unknown">I don't really know</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="operation" className='form-label'>Did you went through operation lately?</label>
                <select
                    id="operation"
                    name="operation"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I did</option>
                    <option value="no">No, I didn't</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="infectious" className='form-label'>Did you have any kind of Infectious deseases?</label>
                <select
                    id="infectious"
                    name="infectious"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No, I haven't</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="infectious_details">
                        If you have any infectious deseases, tell us more...</label>
                  <textarea
                    id="infectious_details"
                    name="infectious_details"
                    className="form-control"
                    rows="3"
                  />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="hib" className='form-label'>Are you diagnosed with any of HIB A, B, or C?</label>
                <select
                    id="hib"
                    name="hib"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="A">Yes, HIB A</option>
                    <option value="B">Yes, HIB B</option>
                    <option value="C">Yes, HIB C</option>
                    <option value="none">No, I don't have HIB</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="heart" className='form-label'>Did you have a Heart Condition?</label>
                <select
                    id="heart"
                    name="heart"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No, I haven't</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="pregnant" className='form-label'>Are you pregnant?</label>
                <select
                    id="pregnant"
                    name="pregnant"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I am</option>
                    <option value="no">No, I am not</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="diabetic" className='form-label'>Are you Diabetic?</label>
                <select
                    id="diabetic"
                    name="diabetic"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No, I haven't</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <label htmlFor="pp" className='form-label'>Did you have Blood Preasure condition?</label>
                <select
                    id="pp"
                    name="pp"
                    className="form-control"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes, I have</option>
                    <option value="no">No, I haven't</option>
                  </select>
                <p className="help-block text-danger"></p>
              </div>
            </div>
          </div>
          <div id="success"></div> 
          <button type="submit" className="btn btn-custom btn-lg">
            Resgiter as Donor
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