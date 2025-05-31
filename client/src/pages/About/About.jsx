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
import thai from "../../assets/images/us/yyy.jpg";
import vuong from "../../assets/images/us/vuong.jpg";
import huy from "../../assets/images/us/huy.jpg";
import tung from "../../assets/images/us/tung.jpg";

const About = () => {
  const Usdata = [
    {
      id: 1,
      img: tung,
      name: "Le Khanh Tung",
      position: "Chief Marketing Officer (CMO)",
      desc: "Tung, an expert in digital marketing, leads our branding and marketing efforts, connecting Travel Smart with a global audience.",
    },
    {
      id: 2,
      img: vuong,
      name: "Le Quy Vuong",
      position:"Chief Technology Officer (CTO)",
      desc: "8 years of experience, drives technology development for Travel Smart, ensuring seamless and secure travel booking systems.",
    },
    {
      id: 3,
      img: huy,
      name: "Dang Quang Huy",
      position:"Chief Operations Officer (COO)",
      desc: "7 years of expertise in optimizing backend processes for a seamless travel experience.",
    },
    {
      id: 4,
      img: thai,
      name: "Chu Ng Quang Thai",
      position:"Head of Customer Experience",
      desc: " 6 years of experience in customer service, dedicated to enhancing every traveler’s journey with exceptional support.",
    },
  ];
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
          {/* <Row className="mt-4 mb-4 align-items-center">
            <Col md="12">
              <h3 className="h2 fw-bold">Our Teams</h3>
            </Col>
            <Row>
              {Usdata.map((member) => (
                <Col key={member.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={member.img}
                      className="card-img-top"
                      alt={member.name}
                    />
                    <div className="card-body">
                    <p className="card-title fs-5 fw-bold">{member.name}</p>
                    <p className="card-text fs-6 fw-semibold mt-3">{member.position}</p>
                    <p className="card-text fs-6 mt-2">{member.desc}</p>
                  </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Row> */}
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
