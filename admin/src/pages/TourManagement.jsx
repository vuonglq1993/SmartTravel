import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/TourManagement.css";

const TourManagement = () => {
  const [tours, setTours] = useState([
    { id: 1, name: "Hạ Long Bay", date: "2024-08-01", price: 1200000, status: "Active" },
    { id: 2, name: "Đà Lạt", date: "2024-09-15", price: 980000, status: "Inactive" },
  ]);

  const [formTour, setFormTour] = useState({ id: null, name: "", date: "", price: "", status: "Active" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormTour({ ...formTour, [e.target.name]: e.target.value });
  };

  const handleAddTour = () => {
    if (!formTour.name || !formTour.date || !formTour.price) return;
    setTours([...tours, { ...formTour, id: Date.now() }]);
    setFormTour({ id: null, name: "", date: "", price: "", status: "Active" });
    setShowForm(false);
  };

  const handleEditTour = (tour) => {
    setIsEditing(true);
    setFormTour(tour);
    setShowForm(true);
  };

  const handleUpdateTour = () => {
    setTours(tours.map((t) => (t.id === formTour.id ? formTour : t)));
    setFormTour({ id: null, name: "", date: "", price: "", status: "Active" });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleDeleteTour = (id) => {
    if (window.confirm("Xoá tour này?")) {
      setTours(tours.filter((t) => t.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="tour-container">
        <h2>Tour Management</h2>
        <button className="add-btn" onClick={() => { setShowForm(true); setIsEditing(false); }}>
          + Add Tour
        </button>

        {showForm && (
          <div className="tour-form">
            <input name="name" placeholder="Tour Name" value={formTour.name} onChange={handleChange} />
            <input name="date" type="date" value={formTour.date} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price (VND)" value={formTour.price} onChange={handleChange} />
            <select name="status" value={formTour.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div>
              {isEditing ? (
                <button className="edit-btn" onClick={handleUpdateTour}>Update</button>
              ) : (
                <button className="add-btn" onClick={handleAddTour}>Add</button>
              )}
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        <table className="tour-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tour Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.id}</td>
                <td>{tour.name}</td>
                <td>{tour.date}</td>
                <td>{tour.price.toLocaleString()} VND</td>
                <td>{tour.status}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditTour(tour)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteTour(tour.id)}>Delete</button>
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

export default TourManagement;
