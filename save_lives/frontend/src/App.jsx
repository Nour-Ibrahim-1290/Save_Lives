import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './Sign/Login';
import SignStart from './Sign/Sign1';
import SignRStart from './Sign/SignRecieverinitial';
import SignDonor from './Sign/SignDonor';
import SignRPatient from './Sign/SignRecieverPatient';
import SignRProf from './Sign/SignRecieverProf';
import "./App.css";
import Dashboard from './dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signstart" element={<SignStart />} />
        <Route path="/signdonor" element={<SignDonor />} />
        <Route path="/signrecieverinitial" element={<SignRStart />} />
        <Route path="/signrecieverpatient" element={<SignRPatient />} />
        <Route path="/signrecieverprof" element={<SignRProf />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;