import React from "react";
import AdminSidebar from "../components/AdminSidebar"; // đảm bảo file này không lỗi
import "../styles/AdminDashboard.css"; // nhớ tạo file CSS tương ứng

const AdminDashboard = () => {
  console.log("✅ AdminDashboard is rendering");

  return (
    <div className="admin-dashboard">

      <div className="dashboard-content">
        <h2>Welcome, Admin!</h2>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Tours</h3>
            <p>24</p>
          </div>
          <div className="card">
            <h3>Total Bookings</h3>
            <p>103</p>
          </div>
          <div className="card">
            <h3>Users</h3>
            <p>38</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$5,320</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
