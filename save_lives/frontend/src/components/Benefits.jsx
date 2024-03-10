import React from "react";

export const Benefits = (props) => {
  return (
    <div id="benefits" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Benefits of Donating Blood</h2>
          <p>
            What are the Benefits and Effects of Blood Donation?
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  {" "}
                  <i className={d.icon}></i>
                  <div className="benefit-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
