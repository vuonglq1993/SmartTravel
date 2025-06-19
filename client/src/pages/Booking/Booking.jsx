import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Booking/booking.css";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/tours/${id}`)
        .then((res) => setTour(res.data))
        .catch((err) => console.error("Error fetching tour:", err));
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!user || !tour) return;

    const bookingData = {
      bookingDate: new Date().toISOString().slice(0, 19),
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      quantity: quantity,
      totalPrice: ((tour.afterDiscount || tour.price || 0) + 100) * quantity,
      status: "PENDING",
      user: { id: user.id },
      tour: { id: tour.id },
    };

    try {
      console.log("Sending booking:", bookingData);
      const bookingRes = await axios.post("http://localhost:8080/api/admin/bookings", bookingData);
      const booking = bookingRes.data;

      const paypalRes = await axios.post("http://localhost:8080/api/paypal/pay", null, {
        params: { bookingId: booking.id },
      });

      const approvalLink = paypalRes.data.find((link) => link.rel === "approval_url");
      if (approvalLink) {
        window.location.href = approvalLink.href;
      } else {
        throw new Error("approval_url not found in PayPal response.");
      }
    } catch (error) {
      console.error("Payment process failed:", error.response?.data || error);
      alert("Lỗi khi xử lý thanh toán: " + (error.response?.data?.message || error.message));
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
                      <Form.Control required type="text" placeholder="Username" value={user?.username || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="email" as={Col} md="6">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="name@example.com" defaultValue={user?.email || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="phone" as={Col} md="6">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Phone Number" defaultValue={user?.phone || ""} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="quantity" as={Col} md="6">
                      <Form.Label>Số lượng người</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={tour?.capacity || 100}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkin" as={Col} md="6">
                      <Form.Label className="d-block">Check In</Form.Label>
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
                        portalId="root-portal"
                        popperPlacement="bottom-start"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkout" as={Col} md="6">
                      <Form.Label className="d-block">Check Out</Form.Label>
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
          <span>Base Price</span>
          <strong>${tour?.price?.toFixed(2) || 0}</strong>
        </ListGroup.Item>

        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
          <span>Taxes & Fees</span>
          <strong>$100.00</strong>
        </ListGroup.Item>

        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
          <span>Quantity</span>
          <strong>{quantity}</strong>
        </ListGroup.Item>

        <ListGroup.Item className="border-top d-flex justify-content-between h5 pt-3 fw-bold">
          <span>Total Price</span>
          <span>
            $
            {tour
              ? (((tour.afterDiscount || tour.price || 0) + 100) * quantity).toFixed(2)
              : "0.00"}
          </span>
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
