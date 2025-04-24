import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../Booking/booking.css";

const Booking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = () => {
        setShowPopup(true);

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        window.location.href = "/";
    };

    const [selectedTravelMode, setSelectedTravelMode] = useState("");
    const [travelPrice, setTravelPrice] = useState(0);

    const travelPrices = {
        Car: 100,
        Bus: 50,
        Train: 70,
        Flight: 200,
    };

    const handleTravelModeChange = (event) => {
        const mode = event.target.value;
        setSelectedTravelMode(mode);
        setTravelPrice(travelPrices[mode] || 0);
    };
    useEffect(() => {
        document.title = "Page Name  ";
        window.scroll(0, 0);
    }, []);

    const [selectedAccommodation, setSelectedAccommodation] = useState("");
    const [accommodationPrice, setAccommodationPrice] = useState(0);

    const accommodationPrices = {
        Hotel: 150,
        Motel: 80,
        Hostel: 50,
        Resort: 250,
    };

    const handleAccommodationChange = (event) => {
        const accommodation = event.target.value;
        setSelectedAccommodation(accommodation);
        setAccommodationPrice(accommodationPrices[accommodation] || 0);
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
                                    <h3 className="h4 font-bold m-0">
                                        {" "}
                                        Your Details
                                    </h3>
                                </div>

                                <Form className="p-4">
                                    <Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="firstname"
                                            className="mb-4"
                                        >
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="First name"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="lastname"
                                            className="mb-4"
                                        >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Last name"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-4"
                                            controlId="email.ControlInput1"
                                            as={Col}
                                            md="6"
                                        >
                                            <Form.Label>
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-4"
                                            controlId="phone"
                                            as={Col}
                                            md="6"
                                        >
                                            <Form.Label>
                                                Phone Number
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Phone Number"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-4"
                                            controlId="checkin"
                                            as={Col}
                                            md="6"
                                        >
                                            <Form.Label className="d-block">
                                                Check In
                                            </Form.Label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) =>
                                                    setStartDate(date)
                                                }
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                className="form-control w-100"
                                                dateFormat="dd, MMMM, yyyy"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-4"
                                            controlId="checkout"
                                            as={Col}
                                            md="6"
                                        >
                                            <Form.Label className="d-block">
                                                Check Out
                                            </Form.Label>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) =>
                                                    setEndDate(date)
                                                }
                                                selectsEnd
                                                startDate={endDate}
                                                endDate={startDate}
                                                dateFormat="dd, MMMM, yyyy"
                                                className="form-control w-100"
                                            />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </div>
                        </Col>

                        <Col md="4" lg="4">
                            <Card className="card-info p-0 shadow-sm bg-white">
                                <Card.Header>
                                    {" "}
                                    <h1 className="font-bold  h4 mt-2">
                                        Price Summary
                                    </h1>{" "}
                                </Card.Header>
                                <Card.Body className="pb-0">
                                    <ListGroup>
                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span> Base Price</span>
                                            <strong>$28,660</strong>{" "}
                                            {/* Giá cơ bản */}
                                        </ListGroup.Item>

                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span>
                                                {" "}
                                                Total Discount{" "}
                                                <span className="badge bg-danger">
                                                    10%
                                                </span>
                                            </span>
                                            <strong>$20</strong>
                                        </ListGroup.Item>

                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span> Travel Mode Price</span>
                                            <strong>${travelPrice}</strong> {}
                                        </ListGroup.Item>

                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span>Accommodations Price</span>
                                            <strong>
                                                ${accommodationPrice}
                                            </strong>{" "}
                                            {}
                                        </ListGroup.Item>

                                        <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                                            <span> Taxes & Fees</span>
                                            <strong>$28,660</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>

                                <Card.Footer className="d-flex justify-content-between py-4">
                                    <span className="font-bold h5">
                                        {" "}
                                        Payable Now
                                    </span>
                                    <strong className="font-bold h5">
                                        $
                                        {28660 +
                                            travelPrice +
                                            accommodationPrice}
                                    </strong>{" "}
                                    {/* Giá tổng */}
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md="4" lg="4">
                            <Card className="card-info p-0 shadow-sm bg-white">
                                <Card.Header>
                                    <h1 className="font-bold h4 mt-2">
                                        Travel Preferences
                                    </h1>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="formTravelPref">
                                            <Form.Label>
                                                Preferred Travel Mode
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                onChange={
                                                    handleTravelModeChange
                                                }
                                            >
                                                <option value="">Select</option>
                                                <option value="Car">Car</option>
                                                <option value="Bus">Bus</option>
                                                <option value="Train">
                                                    Train
                                                </option>
                                                <option value="Flight">
                                                    Flight
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="4" lg="4">
                            <Card className="card-info p-0 shadow-sm bg-white">
                                <Card.Header>
                                    <h1 className="font-bold h4 mt-2">
                                        Accommodations
                                    </h1>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="formAccommodations">
                                            <Form.Label>
                                                Select Accommodation
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                onChange={
                                                    handleAccommodationChange
                                                }
                                            >
                                                <option value="">Select</option>
                                                <option value="Hotel">
                                                    Hotel
                                                </option>
                                                <option value="Motel">
                                                    Motel
                                                </option>
                                                <option value="Hostel">
                                                    Hostel
                                                </option>
                                                <option value="Resort">
                                                    Resort
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="d-flex justify-content-center">
                            <button
                                className="primaryBtn mt-4"
                                onClick={handleSubmit}
                            >
                                Submit Now
                            </button>
                        </Col>
                    </Row>
                </Container>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2>Submission Successful!</h2>
                            <button
                                onClick={handleClosePopup}
                                className="close-btn"
                            >
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
