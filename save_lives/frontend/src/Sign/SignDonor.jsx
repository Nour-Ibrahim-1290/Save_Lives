import React, { useEffect, useState } from "react";
import JsonData from "../data/data.json";
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import { SignDonorForm } from "./SignDonorForm";

import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

const SignDonor = () => {
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
    <SignDonorForm />
    <Contact data={landingPageData.Contact} />
    </div>
  );
}

export default SignDonor;