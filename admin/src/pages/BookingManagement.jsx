import React, { useEffect, useState } from "react";
import "../styles/BookingManagement.css";

const API_URL = "http://localhost:8080/api/bookings";
const TOURS_API = "http://localhost:8080/api/tours";
const USERS_API = "http://localhost:8080/api/users";

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
    quantity: 1,
  });

  useEffect(() => {
    fetchBookings();
    fetchTours();
    fetchUsers();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error fetching bookings: ${res.status}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    }
  };

  const fetchTours = async () => {
    try {
      const res = await fetch(TOURS_API);
      if (!res.ok) throw new Error(`Error fetching tours: ${res.status}`);
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(USERS_API);
      if (!res.ok) throw new Error(`Error fetching users: ${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchBookings();
      } else {
        console.error("Failed to update status:", res.status);
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchBookings();
      } else {
        console.error("Failed to delete booking:", res.status);
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const handleCreateBooking = async () => {
    const { userId, tourId, date, quantity } = newBooking;
    if (!userId || !tourId || !date || quantity <= 0) {
      alert("Please fill in all fields and ensure quantity > 0.");
      return;
    }

    const selectedTour = tours.find((t) => t.id === parseInt(tourId));
    if (!selectedTour) {
      alert("Invalid tour selected.");
      return;
    }

    const totalPrice = selectedTour.price * quantity;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { id: parseInt(userId) },
          tour: { id: parseInt(tourId) },
          bookingDate: date,
          quantity: quantity,
          totalPrice: totalPrice,
          status: "Pending",
        }),
      });
      if (res.ok) {
        fetchBookings();
        setShowForm(false);
        setNewBooking({ userId: "", tourId: "", date: "", quantity: 1 });
      } else {
        console.error("Failed to create booking:", res.status);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  return (
    <div className="booking-container">
      <h2>Booking Management</h2>

      {/* Filter by booking status */}
      <div className="filter-section">
        <label htmlFor="status-filter">Filter by status: </label>
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

      {/* Add new booking */}
      <button className="add-btn" onClick={() => setShowForm(true)}>
        + Create Booking
      </button>

      {showForm && (
        <div className="booking-form">
          <select
            value={newBooking.userId}
            onChange={(e) =>
              setNewBooking({ ...newBooking, userId: e.target.value })
            }
          >
            <option value="">-- Select Customer --</option>
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
            <option value="">-- Select Tour --</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
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

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={newBooking.quantity}
            onChange={(e) =>
              setNewBooking({ ...newBooking, quantity: parseInt(e.target.value) })
            }
          />

          <div>
            <button className="add-btn" onClick={handleCreateBooking}>
              Create
            </button>
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Booking table */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Tour</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Total ($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.username || "Unknown"}</td>
              <td>{b.tourTitle || "Unknown"}</td>
              <td>{b.bookingDate?.slice(0, 10)}</td>
              <td>{b.quantity}</td>
              <td>{b.totalPrice}</td>
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
