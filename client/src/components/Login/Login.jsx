// ✅ FIXED LoginModal component
import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/images/logo/logo co màu.png";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Login.css";

const LoginAdmin = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const userData = response.data.data;

      if (!userData || userData.role !== "ADMIN") {
        alert("Bạn không có quyền truy cập vào trang admin.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Lỗi khi đăng nhập.");
    }
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