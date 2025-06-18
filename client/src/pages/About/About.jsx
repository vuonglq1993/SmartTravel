import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col } from "react-bootstrap";
import "../About/about.css";
import bestPriceImg from "../../assets/images/about/bi_shield-check.png";
import easyBookingImg from "../../assets/images/about/healthicons_i-schedule-school-date-time-outline.png";
import customerServiceImg from "../../assets/images/about/ri_customer-service-2-line.png";
import about1 from "../../assets/images/about/Rectangle 25.png";
import group113 from "../../assets/images/about/Group 113.png";
import group114 from "../../assets/images/about/Group 114.png";
import group115 from "../../assets/images/about/Group 115.png";
import group116 from "../../assets/images/about/Group 116.png";

const About = () => {

  useEffect(() => {
    document.title = "About us";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="About us" pagename="About us" />
      <section className="py-5">
        <Container>
          <Row>
            <h3 className="h2 fw-bold text-center">Why Choose Us?</h3>
            <p className="mb-4 body-text text-center">
              These popular destinations have a lot to offer
            </p>
            <Col md="4" className="text-center">
              <img
                src={bestPriceImg}
                alt="Best price guarantee"
                className="img-fluid mb-3"
                style={{ maxWidth: "80%" }}
              />
              <h3 className="h2">Best price guarantee</h3>
              <p className="mb-2 body-text">
                We offer the most competitive prices across all our travel
                packages, ensuring you get the best value for your money. With
                Travel Smart, there's no need to compromise on your dream
                destinations.
              </p>
            </Col>
            <Col md="4" className="text-center">
              <img
                src={easyBookingImg}
                alt="Easy Booking"
                className="img-fluid mb-3"
                style={{ maxWidth: "80%" }}
              />
              <h3 className="h2">Easy Booking</h3>
              <p className="mb-2 body-text">
                Our platform is designed for hassle-free booking, so you can
                easily explore, compare, and book your next adventure with just
                a few clicks.
              </p>
            </Col>
            <Col md="4" className="text-center">
              <img
                src={customerServiceImg}
                alt="Customer Service 24h"
                className="img-fluid mb-3"
                style={{ maxWidth: "80%" }}
              />
              <h3 className="h2">Customer Service 24h</h3>
              <p className="mb-2 body-text">
                Our dedicated customer service team is available around the
                clock to assist you with any inquiries, ensuring your trip is
                stress-free from start to finish.
              </p>
            </Col>
          </Row>
          <Row className="mt-4 align-items-center">
            <Col md="8">
              <h3 className="h2 fw-bold">About Travel Smart</h3>
              <p className="mb-2 body-text">
                Travel Smart is your trusted partner in travel, offering
                comprehensive solutions to meet all your travel needs. With over
                a decade of experience in the industry, we specialize in
                curating personalized tour packages that cater to all types of
                travelers—from solo adventurers to family vacationers. We aim to
                make every journey memorable by providing high-quality services,
                exclusive experiences, and unbeatable prices.
              </p>
              <p className="mb-2 body-text">
                Our mission is to bring the world closer to you through seamless
                travel experiences. Whether you're looking to explore iconic
                cities or off-the-beaten-path destinations, we ensure your
                journey is packed with discovery, comfort, and excitement.
              </p>
            </Col>
            <Col md="4" className="text-center">
              <img
                src={about1}
                alt="About Travel Smart"
                className="img-fluid mb-3"
                style={{ maxWidth: "100%" }}
              />
            </Col>
          </Row>
          <Row className="mt-5"></Row>
          <Row className="mt-5"></Row>
          <Row className="mt-5">
            <Col md="3" sm="6" xs="6">
              <img
                src={group113}
                alt="About Travel Smart"
                className="img-fluid mb-3"
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col md="3" sm="6" xs="6">
              <img
                src={group114}
                alt="About Travel Smart"
                className="img-fluid mb-3"
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col md="3" sm="6" xs="6">
              <img
                src={group115}
                alt="About Travel Smart"
                className="img-fluid mb-3"
                style={{ maxWidth: "100%" }}
              />
            </Col>
            <Col md="3" sm="6" xs="6">
              <img
                src={group116}
                alt="About Travel Smart"
                className="img-fluid mb-3"
                style={{ maxWidth: "100%" }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
