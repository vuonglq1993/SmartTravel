import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "../Tours/tour.css";
import { tourDetails } from "../../utils/data";
import { NavLink } from "react-router-dom";
import ImageGallery from "react-image-gallery";

import {
  Container,
  Row,
  Nav,
  Col,
  Tab,
  ListGroup,
  Accordion,
  Card,
  Stack,
  TabPane,
} from "react-bootstrap";

const TourDetails = () => {
  // State quản lý các giá trị input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Hàm xử lý khi người dùng gửi bình luận
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường có được nhập hay không (bắt buộc)
    if (firstName && lastName && email && comment) {
      const newComment = {
        firstName,
        lastName,
        email,
        comment,
      };
      setComments([...comments, newComment]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setComment("");
    } else {
      alert("Please fill in all fields.");
    }
  };
  useEffect(() => {
    document.title = " Tours  Details  ";
    window.scroll(0, 0);

    const instagramEmbedScript = document.querySelector(
      'script[src="//www.instagram.com/embed.js"]'
    );

    if (!instagramEmbedScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };

      document.body.appendChild(script);
    } else {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, []);
  return (
    <>
      <Breadcrumbs
        title={tourDetails.title}
        pagename=<NavLink to="/tours">Tours</NavLink>
        childpagename={tourDetails.title}
      />

      <section className="tour_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{tourDetails.title} </h1>
            <ImageGallery
              items={tourDetails.images}
              showNav={false}
              showBullets={false}
              showPlayButton={false}
            />

            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey="1"
              classname=""
            >
              <Row className="py-5">
                <Col md={8} className="mb-3 mb-md-0">
                  <Col md={12}>
                    <Nav
                      variant="pills"
                      className="flex-row nav_bars rounded-2"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="1"> Overview </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Itinerary</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3">
                          {" "}
                          Inclusions & Exclusion{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="4">Location </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="5">Reviews </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="1">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Overview
                        </h1>
                        <p className="body-text">{tourDetails.des}</p>

                        <h5 className="font-bold mb-2 h5  mt-3">Tour Info</h5>

                        <ListGroup>
                          {tourDetails.tourInfo.map((val, index) => {
                            return (
                              <ListGroup.Item
                                className="border-0 pt-0 body-text"
                                key={index}
                                dangerouslySetInnerHTML={{ __html: val }}
                              ></ListGroup.Item>
                            );
                          })}
                        </ListGroup>

                        <h5 className="font-bold mb-2 h5  mt-3">
                          Tour highlights
                        </h5>

                        {tourDetails.highlights.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text"
                              key={index}
                            >
                              {val}
                            </ListGroup.Item>
                          );
                        })}
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="2">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Itinerary
                        </h1>

                        <Accordion defaultActiveKey="0" className="mt-4">
                          {tourDetails.itinerary.map((val, index) => {
                            return (
                              <Accordion.Item
                                eventKey={index}
                                key={index}
                                className="mb-4"
                              >
                                <Accordion.Header>
                                  <h1
                                    dangerouslySetInnerHTML={{
                                      __html: val.title,
                                    }}
                                  ></h1>
                                </Accordion.Header>
                                <Accordion.Body className="body-text">
                                  {val.des}
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          })}
                        </Accordion>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="3">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Inclusions & Exclusions
                        </h1>

                        <h5 className="font-bold mb-3 h5  mt-3">Inclusion</h5>

                        {tourDetails.included.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-check-lg me-2 text-success h4 m-0"></i>{" "}
                              {val}
                            </ListGroup.Item>
                          );
                        })}

                        <h5 className="font-bold mb-3 h5  mt-3">Exclusion</h5>

                        {tourDetails.exclusion.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-x-lg me-2 text-danger h5 m-0"></i>{" "}
                              {val}
                            </ListGroup.Item>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <div className="tour_details">
                        <h1 className="font-bold mb-4 h3 border-bottom pb-2">
                          Location
                        </h1>

                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1010296.398675619!2d114.41207770371561!3d-8.453560368052777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd141d3e8100fa1%3A0x24910fb14b24e690!2sBali%2C%20Indonesia!5e0!3m2!1sen!2sin!4v1724581274620!5m2!1sen!2sin"
                          width="100%"
                          height="400px"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="5">
                      <div class="d-flex justify-content-around flex-wrap mb-4 mt-3">
                        <div className="mw-100 my-1 mx-auto">
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/CxXT6isCJ2W/"
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              borderRadius: "3px",
                              boxShadow:
                                "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                              margin: "1px",
                              maxWidth: "300px",
                              width: "100%",
                            }}
                          ></blockquote>
                        </div>

                        <div className="mw-100 my-1 mx-auto">
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/C8ylzLqs_Xt/"
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              borderRadius: "3px",
                              boxShadow:
                                "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                              margin: "1px",
                              maxWidth: "300px",
                              width: "100%",
                            }}
                          ></blockquote>
                        </div>

                        <div className="mw-100 my-1 mx-auto">
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DADYebQt1ze/?utm_source=ig_embed"
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              borderRadius: "3px",
                              boxShadow:
                                "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                              margin: "1px",
                              maxWidth: "300px",
                              width: "100%",
                            }}
                          ></blockquote>
                        </div>
                        <div className="mw-100 my-1 mx-auto">
                          <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/C8rWSEmpXKc/"
                            data-instgrm-version="14"
                            style={{
                              background: "#FFF",
                              border: "0",
                              borderRadius: "3px",
                              boxShadow:
                                "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                              margin: "1px",
                              maxWidth: "300px",
                              width: "100%",
                            }}
                          ></blockquote>
                        </div>
                      </div>
                      <Row>
                        <h1 className="h3 mb-2">Post your own comment</h1>

                        <form onSubmit={handleCommentSubmit} className="border rounded">
                          {/* First Name và Last Name trên cùng một dòng */}
                          <div className="row pt-4">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="firstName" className="form-label">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Enter your first name"
                              />
                            </div>

                            <div className="col-md-6 mb-3">
                              <label htmlFor="lastName" className="form-label">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                              />
                            </div>
                          </div>

                          {/* Email trên dòng riêng */}
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="Enter your email"
                            />
                          </div>

                          {/* Comment trên dòng riêng */}
                          <div className="mb-3">
                            <label htmlFor="comment" className="form-label">
                              Comment
                            </label>
                            <textarea
                              id="comment"
                              className="form-control"
                              rows="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                              placeholder="Write your review here..."
                            ></textarea>
                          </div>

                          <button type="submit" className="btn btn-primary mb-3">
                            Submit
                          </button>
                        </form>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                <Col md={4}>
                  <aside>
                    <Card className="rounded-3 p-2 shadow-sm mb-4 price-info">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold mb-0 h2">
                            ${tourDetails.price}
                          </h1>
                          <span className="fs-4"> /person</span>
                        </Stack>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <ListGroup horizontal>
                            <ListGroup.Item className="border-0 me-2 fw-bold">
                              {tourDetails.rating}
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-half"></i>
                            </ListGroup.Item>
                          </ListGroup>
                          <h5 className="h6"> ({tourDetails.reviews})</h5>
                        </div>

                        <NavLink
                          to="/booking"
                          className="primaryBtn w-100 d-flex justify-content-center fw-bold"
                        >
                          Book Now
                        </NavLink>
                      </Card.Body>
                    </Card>

                    <Card className="card-info p-2 shadow-sm">
                      <Card.Body>
                        <h1 className="font-bold mb-2 h3">Need Help ?</h1>

                        <ListGroup>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-telephone me-1"></i> Call us on:{" "}
                            <strong>+91 123 456 789</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-alarm me-1"></i> Timing:{" "}
                            <strong>10AM to 7PM</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <strong>
                              {" "}
                              <i className="bi bi-headset me-1"></i> Let us call
                              you
                            </strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-calendar-check me-1"></i>{" "}
                            <strong> Book Appointments</strong>{" "}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
