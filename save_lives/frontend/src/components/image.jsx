import React from "react";
import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

export const Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className="checklist-item">
      <div className="hover-bg">
        {" "}
        <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img src={smallImage} className="img-responsive" alt={title} />{" "}
        </a>{" "}
      </div>
    </div>
  );
};
