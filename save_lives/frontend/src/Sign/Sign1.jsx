import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import JsonData from "../data/data.json";
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";


import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

const SignStart = () => {
    const [landingPageData, setLandingPageData] = useState({});
    
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div>
    <Navigation />
    
    <div id="signstart" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Join Us</h2>
          <p>
          Initiate the process to become part of our community by going with the flow
          </p>
        </div>
        <div className="row center-divs">
        <Link to="/signdonor">
        <button type="submit" className="btn btn-custom btn-lg">
            Donor
          </button>
          </Link>

          <Link to="/signrecieverinitial">
          <button type="submit" className="btn btn-custom btn-lg">
            Reciever
          </button>
          </Link>
      </div>
      </div>
    </div>
    </div>



    <Contact data={landingPageData.Contact} />
    </div>
  );
}

export default SignStart;