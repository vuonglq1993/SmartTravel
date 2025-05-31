import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminSidebar.css";


const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/tours">Tour Management</Link></li>
        <li><Link to="/admin/bookings">Booking Management</Link></li>
        <li><Link to="/admin/state">State Management</Link></li>
        <li><Link to="/admin/reviews">Review Management</Link></li>
        <li><Link to="/admin/notifications">Notifications</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
