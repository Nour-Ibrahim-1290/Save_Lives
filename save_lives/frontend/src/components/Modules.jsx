import React from "react";
import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

export const Modules = (props) => {
  return (
    <div id="expectations">
      <div className="container">
        <div className="section-title text-center">
          <h2>What to expect from Save Lives</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="expectations">
                    <div className="expectation-image">
                      {" "}
                      <i className="fa fa-check" style={{color: '#ff2222'}} aria-hidden="true"></i>
                      {/* <img src={d.img} alt="" /> */}
                      {" "}
                    </div>
                    <div className="expectation-content">
                      {/* <p>"{d.text}"</p> */}
                      <div className="expectation-meta"> {d.text} </div>
                      <div className="expectation-meta" 
                            style={{ color: d.type === 'Live' ? '#3898ff' : '#ff2222' }}> {d.type} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
