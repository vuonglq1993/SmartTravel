import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import image from "../../assets/images/new/contact-us.png";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact us";
    window.scroll(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  };

  return (
    <>
      <Breadcrumbs title="Contact us" pagename="Contact us" />
      <section className="contact pt-5">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="mb-2 h1 font-bold">
                Let's connect and get to know each other
              </h1>
              <p className="body-text mt-1">
                At Travel Smart, we believe in building strong relationships with our
                customers. Whether you have a question, need assistance, or just want to
                chat about your travel plans, we're here for you.
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col lg="4" md="6">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center my-2">
                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-headset h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Call US</Card.Title>
                  <p className="mb-3 body-text">
                    Have a question or need support? Our team is ready to assist you 24/7.
                  </p>
                  <a type="button" className="btn btn-light me-2 btn-sm">
                    <i className="bi bi-phone me-1"></i> +1 (234) 567-890
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="6">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center my-2">
                    <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Email Us</Card.Title>
                  <p className="mb-3 body-text">
                    Prefer to drop a message? Send us an email and we'll get back to you.
                  </p>
                  <a type="button" className="btn btn-light me-2 btn-sm">
                    <i className="bi bi-envelope me-2"></i> support@travelsmart.com
                  </a>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="12">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center my-2">
                    <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-globe h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Social Media</Card.Title>
                  <p className="mb-3 body-text">
                    Follow us on social media to stay updated on the latest travel tips.
                  </p>
                  <ListGroup horizontal className="justify-content-center">
                    <ListGroup.Item className="border-0">
                      <i className="bi bi-youtube"></i>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <i className="bi bi-instagram"></i>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <i className="bi bi-twitter"></i>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="Contact Us" className="img-fluid me-3" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <h1 className="h3 font-bold mb-4">Send us message</h1>

                  {/* THÔNG BÁO */}
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}

                  <Form>
                    <Row>
                      <Col md="6">
                        <FloatingLabel
                          controlId="name"
                          label="Full Name"
                          className="mb-4"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel
                          controlId="email"
                          label="Email address"
                          className="mb-4"
                        >
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="12">
                        <FloatingLabel
                          controlId="phone"
                          label="Phone Number"
                          className="mb-4"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="12">
                        <FloatingLabel controlId="message" label="Message">
                          <Form.Control
                            as="textarea"
                            placeholder="Message"
                            style={{ height: "126px" }}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Button
                      className="primaryBtn mt-3"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Send Message
                    </Button>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
