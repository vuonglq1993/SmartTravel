// BookingManagement.jsx — đã sửa token và giữ nguyên CSS import

import React, { useEffect, useState } from "react";
import "../styles/BookingManagement.css";

const API_URL = "http://localhost:8080/api/admin/bookings";
const TOURS_API = "http://localhost:8080/api/admin/tours";
const USERS_API = "http://localhost:8080/api/admin/users";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    userId: "",
    tourId: "",
    date: "",
    status: "Pending",
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
    fetchTours();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = getToken();
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error fetching bookings: ${res.status}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch bookings:", err);
      setBookings([]);
    }
  };

  const fetchTours = async () => {
    try {
      const token = getToken();
      const res = await fetch(TOURS_API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error fetching tours: ${res.status}`);
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch tours:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const res = await fetch(USERS_API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error fetching users: ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    const updatedBooking = { ...booking, status: newStatus };

    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBooking),
      });
      if (res.ok) fetchBookings();
      else console.error("Update booking failed with status:", res.status);
    } catch (err) {
      console.error("Lỗi khi cập nhật booking:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá đơn đặt tour này?")) return;

    try {
      const token = getToken();
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) fetchBookings();
      else console.error("Delete booking failed with status:", res.status);
    } catch (err) {
      console.error("Lỗi khi xoá booking:", err);
    }
  };

  const handleCreateBooking = async () => {
    const { userId, tourId, date } = newBooking;
    if (!userId || !tourId || !date) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    const tour = tours.find((t) => t.id === parseInt(tourId));
    if (!tour) {
      alert("Tour không hợp lệ.");
      return;
    }

    try {
      const token = getToken();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: { id: parseInt(userId) },
          tour: tour,
          bookingDate: date,
          status: "Pending",
        }),
      });
      if (res.ok) {
        fetchBookings();
        setShowForm(false);
        setNewBooking({ userId: "", tourId: "", date: "", status: "Pending" });
      } else {
        console.error("Tạo booking thất bại với status:", res.status);
      }
    } catch (err) {
      console.error("Lỗi tạo booking:", err);
    }
  };

  const filteredBookings =
    Array.isArray(bookings) && filterStatus !== "All"
      ? bookings.filter((b) => b.status === filterStatus)
      : bookings;

  return (
    <div className="booking-container">
      <h2>Booking Management</h2>

      <div className="filter-section">
        <label htmlFor="status-filter">Lọc theo trạng thái: </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        + Tạo Booking
      </button>

      {showForm && (
        <div className="booking-form">
          <select
            value={newBooking.userId}
            onChange={(e) =>
              setNewBooking({ ...newBooking, userId: e.target.value })
            }
          >
            <option value="">-- Chọn khách hàng --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
          <select
            value={newBooking.tourId}
            onChange={(e) =>
              setNewBooking({ ...newBooking, tourId: e.target.value })
            }
          >
            <option value="">-- Chọn tour --</option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.title}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newBooking.date}
            onChange={(e) =>
              setNewBooking({ ...newBooking, date: e.target.value })
            }
          />
          <div>
            <button className="add-btn" onClick={handleCreateBooking}>
              Tạo
            </button>
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              Huỷ
            </button>
          </div>
        </div>
      )}

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
          {Array.isArray(filteredBookings) &&
            filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user?.username || "Không rõ"}</td>
                <td>{b.tour?.title || "Không rõ"}</td>
                <td>{b.bookingDate?.slice(0, 10) || "Không rõ"}</td>
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
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;