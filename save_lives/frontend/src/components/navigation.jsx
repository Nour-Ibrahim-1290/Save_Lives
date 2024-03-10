import React from "react";

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
          <a className="navbar-brand page-scroll" href="#page-top" style={{color: '#ff2222'}}>
            Save Lives
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#benefits" className="page-scroll">
                Benefits
              </a>
            </li>
            <li>
              <a href="#checklist" className="page-scroll">
                Checklist
              </a>
            </li>
            {/* <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li> */}
            {/* <li>
              <a href="#resources" className="page-scroll">
                Resources
              </a>
            </li> */}
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll" style={{color: '#ff2222', fontWeight: '400'}}>
                Login
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll" style={{color: '#ff2222', fontWeight: '400'}}>
                Join us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
