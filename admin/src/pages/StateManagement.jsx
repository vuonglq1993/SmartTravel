import React from "react";

import "../styles/StateManagement.css";

const StateManagement = () => {
  // Dữ liệu tạm (sẽ lấy từ backend sau)
  const stats = [
    { title: "Tour Active", count: 12, color: "#007bff" },
    { title: "Tour Inactive", count: 4, color: "#6c757d" },
    { title: "Booking Pending", count: 3, color: "#ffc107" },
    { title: "Booking Confirmed", count: 8, color: "#28a745" },
    { title: "Booking Cancelled", count: 2, color: "#dc3545" },
    { title: "Admin Users", count: 5, color: "#6610f2" },
    { title: "Regular Users", count: 18, color: "#17a2b8" },
  ];

  return (
    <>
      
      <div className="state-container">
        <h2>System Status Overview</h2>
        <div className="state-grid">
          {stats.map((item, index) => (
            <div className="state-card" key={index} style={{ borderLeft: `6px solid ${item.color}` }}>
              <h3>{item.count}</h3>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default StateManagement;
