// ✅ FIXED LoginModal component
import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/images/logo/logo co màu.png";
import axios from "axios";

const LoginModal = ({ isOpen, toggle, setUser }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailCheckResult, setEmailCheckResult] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") setEmailCheckResult("");
  };

  const handleEmailCheck = async () => {
    if (!formData.email) {
      setEmailCheckResult("Please enter an email to check.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/auth/check-email?email=${formData.email}`);
      setEmailCheckResult(response.data.exists ? "This email is already registered." : "This email is available.");
    } catch (error) {
      setEmailCheckResult("An error occurred while checking the email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLoginMode && !formData.username)) {
      alert("All fields are required.");
      return;
    }

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      const payload = isLoginMode
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const url = isLoginMode
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/create";

      const response = await axios.post(url, payload);

      const userData = isLoginMode ? response.data.data : response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        toggle();
      }, 1500);
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    toggle();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={toggle}>&times;</button>

        <div className="text-center mb-4 mt-4">
          <img src={logo} alt="Logo" className="modal-logo" style={{ maxWidth: "50%" }} />
          <p className="fs-3 fw-bold">{isLoginMode ? "LOGIN FORM" : "REGISTER FORM"}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="d-flex align-items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{ flex: 2, marginRight: "10px" }}
              />
              {!isLoginMode && (
                <button
                  type="button"
                  className="btn pb-2 pt-2 mb-1 btn-secondary btn-sm"
                  onClick={handleEmailCheck}
                  style={{ whiteSpace: "nowrap", flex: 1 }}
                >
                  Check Email
                </button>
              )}
            </div>
            {!isLoginMode && emailCheckResult && (
              <small className={emailCheckResult.includes("available") ? "text-success" : "text-danger"}>
                {emailCheckResult}
              </small>
            )}
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
              {isLoginMode ? "Don't have an account?" : "Already have an account?"} {" "}
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

export default LoginModal;