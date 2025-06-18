import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  Col,
  Container,
  Row,
  Card,
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

  // Error states
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    // Email & phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,15}$/;

    let hasError = false;

    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!phoneRegex.test(formData.phone)) {
      setPhoneError("Please enter a valid phone number (9–15 digits).");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) return;

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
          {/* Info section omitted for brevity */}

          <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="Contact Us" className="img-fluid me-3" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <h1 className="h3 font-bold mb-4">Send us message</h1>

                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}

                  <Form>
                    <Row>
                      <Col md="6">
                        <FloatingLabel controlId="name" label="Full Name" className="mb-4">
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
                        <FloatingLabel controlId="email" label="Email address" className="mb-4">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData({ ...formData, email: value });

                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                              if (!emailRegex.test(value)) {
                                setEmailError("Invalid email format.");
                              } else {
                                setEmailError("");
                              }
                            }}
                          />
                          {emailError && <small className="text-danger">{emailError}</small>}
                        </FloatingLabel>
                      </Col>
                      <Col md="12">
                        <FloatingLabel controlId="phone" label="Phone Number" className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormData({ ...formData, phone: value });

                              const phoneRegex = /^[0-9]{9,15}$/;
                              if (!phoneRegex.test(value)) {
                                setPhoneError("Invalid phone number (only 9–15 digits).");
                              } else {
                                setPhoneError("");
                              }
                            }}
                          />
                          {phoneError && <small className="text-danger">{phoneError}</small>}
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
                      className="primaryBtn mt-3 px-3"
                      type="button"
                      onClick={handleSubmit}
                      style={{
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
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
