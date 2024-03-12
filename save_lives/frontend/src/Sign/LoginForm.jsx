import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";



const initialState = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const sendLoginRequest = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/login/', {
      email,
      password
    });

    return response.data; // this will be { token, sessionId } if successful
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const LoginForm = (props) => {
  const [{ email, password }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("Inside HandleChange");
    console.log(e);
    e.preventDefault();
    const isValid = await validationSchema.isValid({ email, password });
    if (isValid) {
      const response = await sendLoginRequest(email, password);
      console.log(response);
    } else {
      console.log('Invalid form submission');
    }
  };

  return (
    <div id="log" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Login</h2>
          <p>
             Enter your email below to login to your account.
          </p>
        </div>
        <form name="sentMessage" validate onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12">
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
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <p className="help-block text-danger"></p>
              </div>
            </div>
          </div>
          <div id="success"></div>
          <button type="submit" className="btn btn-custom btn-lg">
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline" to="/signstart" style={{ marginLeft: '10px' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>


{/*       
    <div id="log" className="card mx-auto max-w-sm">
       <div className="card-header space-y-1">
         <h2 className="text-2xl font-bold">Login</h2>
         <p>Enter your email below to login to your account</p>
       </div>
       <div className="card-body">
         <div className="space-y-4">
           <div className="space-y-2">
             <label htmlFor="email">Email</label>
             <input id="email" placeholder="m@example.com" required type="email" className="input" />
           </div>
           <div className="space-y-2">
             <div className="flex items-center">
               <label htmlFor="password">Password</label>
               <Link className="ml-auto inline-block text-sm underline" href="#">
                 Forgot your password?
               </Link>
             </div>
             <input id="password" required type="password" className="input" />
           </div>
           <button className="btn w-full" type="submit">
             Login
           </button>
           <button className="btn w-full" variant="outline">
             Login with Google
           </button>
         </div>
         <div className="mt-4 text-center text-sm">
           Don't have an account?
           <Link className="underline" href="#">
             Sign up
           </Link>
         </div>
       </div>
     </div> */}
         </div>
  );
}