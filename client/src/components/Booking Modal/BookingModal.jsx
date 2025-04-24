import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./BookingModal.css"; 
import logo from "../../assets/images/logo/logo co màu.png"; 

const BookingModal = ({ isOpen, toggle }) => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); 

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessPopup(true); 

        setTimeout(() => {
            setShowSuccessPopup(false); 
            toggle(); 
            window.location.href = "/"; 
        }, 3000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={toggle}>
                    &times;
                </button>
                <div className="mb-4 mt-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="modal-logo"
                        style={{ maxWidth: "50%" }}
                    />
                    <p
                        className="text-center fs-3"
                        style={{ fontWeight: "bold" }}
                    >
                        TOUR BOOK FORM
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Row>
                            <Col md="6">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="First name"
                                    required
                                />
                            </Col>
                            <Col md="6">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Last name"
                                    required
                                />
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md="6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    required
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="### ### ####"
                                    required
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label htmlFor="date">Select Date</label>
                        <input type="date" id="date" name="date" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">
                            Anything else we should know?
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="sub-mit-btn">
                            Send
                        </button>
                    </div>
                </form>

                {showSuccessPopup && (
                    <div className="success-popup">
                        <div className="popup-content">
                            <p>Booking Successful!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
