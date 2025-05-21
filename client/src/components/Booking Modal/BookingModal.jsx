
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./BookingModal.css";
import logo from "../../assets/images/logo/logo co màu.png";

const BookingModal = ({ isOpen, toggle }) => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLoginMode && formData.password !== formData.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        if (formData.password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        // TODO: Gọi API đăng nhập hoặc đăng ký

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
                <div className="mb-4 mt-4 text-center">
                    <img src={logo} alt="Logo" className="modal-logo" style={{ maxWidth: "50%" }} />
                    <p className="fs-3 fw-bold">{isLoginMode ? "LOGIN FORM" : "REGISTER FORM"}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                required
                            />
                        </div>
                    )}

                    <div className="text-center mt-3">
                        <button type="submit" className="sub-mit-btn">
                            {isLoginMode ? "Login" : "Register"}
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <span>
                            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => setIsLoginMode(!isLoginMode)}
                            >
                                {isLoginMode ? "Register here" : "Login here"}
                            </button>
                        </span>
                    </div>
                </form>

                {showSuccessPopup && (
                    <div className="success-popup">
                        <div className="popup-content">
                            <p>{isLoginMode ? "Login successful!" : "Registration successful!"}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
