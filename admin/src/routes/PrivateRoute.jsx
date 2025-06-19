// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem("role");
  return isAuthenticated && role === "admin" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
