// TourManagement.jsx — đã sửa lỗi gửi token

import React, { useEffect, useState } from "react";
import "../styles/TourManagement.css";

const TOURS_API = "http://localhost:8080/api/admin/tours";
const DESTINATIONS_API = "http://localhost:8080/api/admin/destinations";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchTours();
    fetchDestinations();
  }, []);

  const fetchTours = async () => {
    try {
      const token = getToken();
      const res = await fetch(TOURS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch tours:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const token = getToken();
      const res = await fetch(DESTINATIONS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch destinations:", err);
    }
  };

  return (
    <div className="tour-container">
      <h2>Tour Management</h2>
      {/* Bạn có thể thêm phần hiển thị hoặc quản lý tour ở đây */}
    </div>
  );
};

export default TourManagement;