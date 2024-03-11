import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Benefits } from "./Benefits";
import { Checklist } from "./Checklist";
import { Modules } from "./Modules";
import { Resources } from "./Resources";
import { Contact } from "./contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Benefits data={landingPageData.Benefits} />
      <Checklist data={landingPageData.Checklist} />
      <Modules data={landingPageData.Expectations} />
      <Resources data={landingPageData.Resources} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default LandingPage;