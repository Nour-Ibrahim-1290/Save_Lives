import React from "react";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import "../style/css/style.css";
import "../style/css/bootstrap.css";
import "../style/fonts/font-awesome/css/font-awesome.css";
import "../style/css/nivo-lightbox/nivo-lightbox.css";
import "../style/css/nivo-lightbox/default.css";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link className="navbar-brand page-scroll" to="/#header" style={{color: '#ff2222'}}>
            Save Lives
          </Link>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <HashLink to="/#features" className="page-scroll">
                Features
              </HashLink>
            </li>
            <li>
              <HashLink to="/#about" className="page-scroll">
                About
              </HashLink>
            </li>
            <li>
              <HashLink to="/#benefits" className="page-scroll">
                Benefits
              </HashLink>
            </li>
            <li>
              <HashLink to="/#checklist" className="page-scroll">
                Checklist
              </HashLink>
            </li>
            <li>
              <HashLink to="/#contact" className="page-scroll">
                Contact
              </HashLink>
            </li>
            <li>
              
            <Link to="/login" className="page-scroll" style={{color: '#ff2222', fontWeight: '400'}}>
              Login
            </Link>
              
            </li>
            <li>
              <Link to="/signstart" className="page-scroll" style={{color: '#ff2222', fontWeight: '400'}}>
                Join us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
