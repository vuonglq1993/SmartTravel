// src/pages/LoginAdmin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Dữ liệu từ API login:", data); // 👈 THÊM DÒNG NÀY

      if (response.ok && data.result === true) {
        if (data.data.role !== "admin") {
          alert("Tài khoản không có quyền truy cập trang quản trị.");
          return;
        }

        setIsAuthenticated(true);
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
        navigate("/admin/dashboard");
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Không thể kết nối đến máy chủ");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
