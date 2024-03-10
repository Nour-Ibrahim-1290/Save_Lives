import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Benefits } from "./components/Benefits";
import { Checklist } from "./components/Checklist";
import { Modules } from "./components/Modules";
import { Resources } from "./components/Resources";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
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

export default App;
