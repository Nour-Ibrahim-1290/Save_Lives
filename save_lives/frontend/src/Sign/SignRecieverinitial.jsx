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

const SignRStart = () => {
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
    
    <div id="signri" className="container">
    <div className="col-md-8">
      <div className="row">
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2>Join as Recievr</h2>
          <p>
          Welcome to our community and hope we can connect you to the help you need
          </p>
        </div>
        <div className="row center-divs">
        <Link to="/signrecieverprof">
        <button type="submit" className="btn btn-custom btn-lg">
            Medical Professional
          </button>
          </Link>

          <Link to="/signrecieverpatient">
          <button type="submit" className="btn btn-custom btn-lg">
            Patient or Family
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

export default SignRStart;