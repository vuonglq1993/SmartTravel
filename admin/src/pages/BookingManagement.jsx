import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/BookingManagement.css";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 1, customer: "Nguyễn Văn A", tour: "Hạ Long Bay", date: "2024-08-01", status: "Pending" },
    { id: 2, customer: "Trần Thị B", tour: "Đà Lạt", date: "2024-09-15", status: "Confirmed" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Xoá đơn đặt tour này?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="booking-container">
        <h2>Booking Management</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Tour</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customer}</td>
                <td>{b.tour}</td>
                <td>{b.date}</td>
                <td>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default BookingManagement;
