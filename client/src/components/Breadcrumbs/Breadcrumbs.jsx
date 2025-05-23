import React from "react";
import "../Breadcrumbs/breadcrumbs.css";
import {Container} from "react-bootstrap";



const Breadcrumbs = (props) => {
  return (
    <>
      <div className="inner-banner-wrap">
        <div className="inner-banner-container">
          <Container>
            <div className="inner-banner-content">
              <h1 className="fs-1 text-white text-uppercase font-bold">
                {" "}
                {props.title}{" "}
              </h1>
            </div>
          </Container>
        </div>
      </div>
      <div className="navbar-link py-1">
      </div>
    </>
  );
};

export default Breadcrumbs;
