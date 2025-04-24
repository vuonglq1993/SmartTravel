import React from "react";
import "../Features/features.css";
import feature5 from "../../assets/images/feature/preview.png";
import { Card, Col, Container, Row } from "react-bootstrap";



const Features = () => {

  return (
    <>
    
      <section className="feature-section">
        <Container>
          <Row>
            <Col lg = "6" md="6" sm = "12">
            <div className="image-container">

              <img src={feature5} className="img-fluid hover-image"></img>
              </div>
            </Col>
            <Col lg = "6" md="6" sm = "12">
              <p className="fs-6 text-success m-3"><strong>Wanderlust Journeys</strong></p>
              <p className="fs-3 m-3"><strong>Discover the world, effortlessly</strong></p>
            <p className = "fs-6 m-3">At Wanderlust Journeys, we are dedicated to providing you with unforgettable travel experiences. Whether you're seeking adventure in the mountains, relaxation by the sea, or cultural immersion in bustling cities, we have something for everyone. Our team of travel experts works around the clock to ensure that every aspect of your journey is seamless, from start to finish.</p>
            <Row>
              <Col md="6">
                <p className="text-success fs-1 mt-5 ms-2">100+</p>
                <p className="fs-6 mt-3 ms-2">Holiday Package</p>
                <p className="text-success fs-1 mt-5 ms-2">68</p>
                <p className="fs-6 mt-3 ms-2">Elite Transportation</p>
              </Col>
              <Col md="6">
                <p className="text-success fs-1 mt-5 ms-2">172</p>
                <p className="fs-6 mt-3 ms-2">Hotels</p>
                <p className="text-success fs-1 mt-5 ms-2">32M+</p>
                <p className="fs-6 mt-3 ms-2">We help to find your dream place</p>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Features;