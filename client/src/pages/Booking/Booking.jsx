import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Booking/booking.css";

// Utility: Get today with time set to 00:00
const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [tour, setTour] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Load tour details based on ID
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/tours/${id}`)
        .then((res) => setTour(res.data))
        .catch((err) => console.error("Error fetching tour:", err));
    }
  }, [id]);

  // Calculate prices
  const basePrice = tour ? (tour.afterDiscount || tour.price || 0) : 0;
  const tax = basePrice * quantity * 0.1;
  const totalPrice = basePrice * quantity + tax;

  // Handle booking and redirect to PayPal approval link
  const handleSubmit = async () => {
    if (!user || !tour) return;

    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().slice(0, 19); // yyyy-MM-ddTHH:mm:ss
    };

    const bookingData = {
      bookingDate: formatDate(new Date()),
      quantity,
      totalPrice,
      status: "Pending",
      user: { id: user?.id },   // ✅ tránh lỗi undefined
      tour: { id: tour?.id },   // ✅ tránh lỗi undefined
    };


    try {
      const bookingRes = await axios.post("http://localhost:8080/api/bookings", bookingData);
      const booking = bookingRes.data;

      const paypalRes = await axios.post("http://localhost:8080/api/paypal/pay", null, {
        params: { bookingId: booking.id },
      });

      const approvalLink = paypalRes.data.find((link) => link.rel === "approval_url");
      if (approvalLink) {
        const redirectUrl = new URL(approvalLink.href);
        redirectUrl.searchParams.append("bookingId", booking.id);
        redirectUrl.searchParams.append("email", user.email);
        window.location.href = redirectUrl.toString();
      } else {
        throw new Error("approval_url not found in PayPal response.");
      }
    } catch (error) {
      console.error("Payment process failed:", error.response?.data || error);
      alert("Error during payment processing: " + (error.response?.data?.message || error.message));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = "/";
  };

  return (
    <>
      <Breadcrumbs title="Booking" pagename="Booking" />
      <section className="booking-section py-5">
        <Container>
          <Row>
            <Col md="8" lg="8">
              <div className="booking-form-warp border rounded-3">
                <div className="form-title px-4 border-bottom py-3">
                  <h3 className="h4 font-bold m-0">Your Details</h3>
                </div>

                <Form className="p-4">
                  <Row>
                    <Form.Group as={Col} md="12" controlId="username" className="mb-4">
                      <Form.Label>Username</Form.Label>
                      <Form.Control required type="text" value={user?.username || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="email" as={Col} md="6">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" defaultValue={user?.email || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="phone" as={Col} md="6">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" defaultValue={user?.phone || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="quantity" as={Col} md="6">
                      <Form.Label>Number of People</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={tour?.capacity || 100}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkin" as={Col} md="6">
                      <Form.Label>Check In</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          if (date > endDate) setEndDate(date);
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control w-100"
                        dateFormat="dd, MMMM, yyyy"
                        minDate={getToday()}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkout" as={Col} md="6">
                      <Form.Label>Check Out</Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control w-100"
                        dateFormat="dd, MMMM, yyyy"
                        minDate={startDate}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md="4" lg="4">
              <Card className="card-info p-0 shadow-sm bg-white">
                <Card.Header>
                  <h1 className="font-bold h4 mt-2">Price Summary</h1>
                </Card.Header>
                <Card.Body className="pb-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span>Tour Price</span>
                      <strong>${basePrice.toFixed(2)}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span>Total for {quantity} person(s)</span>
                      <strong>${(basePrice * quantity).toFixed(2)}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span>Tax (10%)</span>
                      <strong>${tax.toFixed(2)}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-top d-flex justify-content-between h5 pt-3 fw-bold">
                      <span>Grand Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" className="d-flex justify-content-center">
              <button className="primaryBtn mt-4" onClick={handleSubmit}>
                Pay Now
              </button>
            </Col>
          </Row>
        </Container>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Submission Successful!</h2>
              <button onClick={handleClosePopup} className="close-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Booking;
