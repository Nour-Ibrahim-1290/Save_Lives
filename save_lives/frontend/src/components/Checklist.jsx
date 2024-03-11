import { Image } from "./image";
import React from "react";
import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";


export const Checklist = (props) => {
  return (
    <div id="checklist" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Blood Donation Checklist</h2>
          <p>
            What are the requirements to donate blood? Here's a checklist to go throuhg before registring as a Donor.
          </p>
        </div>
        <div className="row">
          <div className="checklist-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
