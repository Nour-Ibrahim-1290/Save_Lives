import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";


const initialState = {
  name: "",
  email: "",
  message: "",
};


export const SignRPatientForm = (props) => {


  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    
  };

  return (
    <div id="signd" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Patient or Family Register</h2>
          <p>
           To Facilitate your journey, we will ask you to provide some specialized information, we'll try our best to help out.
          </p>
        </div>
        <form name="sentMessage" validate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={handleChange}
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
        </div>
      </div>
    </div>
  </div>
  );
}