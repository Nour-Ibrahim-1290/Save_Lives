import React from "react";
import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

export const Resources = (props) => {
  return (
    <div id="resources" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Important Links</h2>
          <p>
            Chcek out these resources for more information about blood donation, blood types and the importance and significance of the whole process.
          </p>
        </div>
        <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 resource">
                  <div className="thumbnail">
                    {" "}
                    <a href={d.link} target="_blank" rel="noopener noreferrer">
                    <img src={d.img} alt="..." className="resource-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                   </a>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
