import React from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="overfooter-section">
        <p className="fs-5 text-center">Over 65,000 trips every week, selected by 240+ experts</p>
      </div>
      <div className="footer-section">
        <Container>
          <Row>
            <Col md="3" sm="6" xs="6" className="footer_col">
              <p className="fs-5 m-3 text-decoration-underline">About us</p>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/about-us"><p className=" ms-3 fs-6">About TravelSmart</p></NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/"><p className="ms-3 fs-6">Reviews</p></NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="6" xs="6" className="footer_col">
              <p className="fs-5 m-3 text-decoration-underline">Explorer</p>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/tours"><p className="ms-3 fs-6">Tours Listing</p></NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/top-places"><p className="ms-3 fs-6">Top Places</p></NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/gallery"><p className="ms-3 fs-6">Gallery</p></NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md="3" sm="6" xs="6" className="footer_col">
              <p className="fs-5 m-3 text-decoration-underline">Quicklink</p>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/"><p className="ms-3 fs-6">Home</p></NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/about-us"><p className="ms-3 fs-6">About Us</p></NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/contact-us"><p className="ms-3 fs-6">Contact</p></NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md="3" sm="6" xs="6">
              <iframe className="img-fluid mt-3"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3724.105082237043!2d105.7798431!3d21.028481!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a11!2zOGEgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDA!5e0!3m2!1sen!2s!4v1726756979024!5m2!1sen!2s"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Col>

          </Row>

          <Row className="footer_bottom align-items-center">
            <Col md="4" sm="12" className="text-md-start mt-1 text-center footer_language_select_wrapper">
            </Col>

            <Col md="4" sm="12" className="text-center mt-1 copyright">
              <p>Copyright 2024 © by Group 1 T2403M Aptech HaNoi</p>
            </Col>

            <Col md="4  " sm="12" className="text-md-end mt-1 text-center footer_social_icons">
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-pinterest"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp"></i></a>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
