import React, { useEffect, useState } from "react";
import "../styles/TourManagement.css";

const API_TOUR = "http://localhost:8080/api/admin/tours";
const API_DEST = "http://localhost:8080/api/admin/destinations";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [formTour, setFormTour] = useState({
    id: null,
    title: "",
    startDate: "",
    endDate: "",
    price: "",
    capacity: "",
    description: "",
    status: "Active",
    destination: { id: "" },
    images: [{ description: "", url: "" }]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTours();
    fetchDestinations();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch(API_TOUR);
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch tours:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res = await fetch(API_DEST);
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi fetch destinations:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "destination") {
      setFormTour({ ...formTour, destination: { id: parseInt(value) } });
    } else {
      setFormTour({ ...formTour, [name]: value });
    }
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...formTour.images];
    newImages[index][field] = value;
    setFormTour({ ...formTour, images: newImages });
  };

  const handleAddImageField = () => {
    setFormTour({ ...formTour, images: [...formTour.images, { description: "", url: "" }] });
  };

  const handleRemoveImageField = (index) => {
    const newImages = formTour.images.filter((_, i) => i !== index);
    setFormTour({ ...formTour, images: newImages });
  };

  const handleAddTour = async () => {
    const { title, startDate, endDate, price, capacity, description, destination, images } = formTour;
    if (!title || !startDate || !endDate || !price || !capacity || !description || !destination.id) return;

    try {
      const res = await fetch(API_TOUR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formTour),
      });
      if (res.ok) {
        fetchTours();
        resetForm();
      }
    } catch (err) {
      console.error("Lỗi khi thêm tour:", err);
    }
  };

  const handleEditTour = (tour) => {
    setIsEditing(true);
    setFormTour({
      ...tour,
      destination: tour.destination || { id: "" },
      images: tour.images || [{ description: "", url: "" }]
    });
    setShowForm(true);
  };

  const handleUpdateTour = async () => {
    try {
      const res = await fetch(`${API_TOUR}/${formTour.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formTour),
      });
      if (res.ok) {
        fetchTours();
        resetForm();
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật tour:", err);
    }
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm("Xoá tour này?")) {
      try {
        const res = await fetch(`${API_TOUR}/${id}`, {
          method: "DELETE"
        });
        if (res.ok) fetchTours();
      } catch (err) {
        console.error("Lỗi khi xoá tour:", err);
      }
    }
  };

  const resetForm = () => {
    setFormTour({
      id: null,
      title: "",
      startDate: "",
      endDate: "",
      price: "",
      capacity: "",
      description: "",
      status: "Active",
      destination: { id: "" },
      images: [{ description: "", url: "" }]
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="tour-container">
      <h2>Tour Management</h2>
      <button className="add-btn" onClick={() => { setShowForm(true); setIsEditing(false); }}>
        + Add Tour
      </button>

      {showForm && (
        <div className="tour-form">
          <input name="title" placeholder="Tour Name" value={formTour.title} onChange={handleChange} required />
          <input name="startDate" type="date" value={formTour.startDate} onChange={handleChange} required />
          <input name="endDate" type="date" value={formTour.endDate} onChange={handleChange} required />

          <select name="destination" value={formTour.destination.id || ""} onChange={handleChange} required>
            <option value="">-- Chọn điểm đến --</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name} - {d.country}</option>
            ))}
          </select>

          <input name="price" type="number" placeholder="Price (USD)" value={formTour.price} onChange={handleChange} required />
          <input name="capacity" type="number" placeholder="Capacity" value={formTour.capacity} onChange={handleChange} required />

          <textarea
            name="description"
            placeholder="Tour Description"
            value={formTour.description}
            onChange={handleChange}
            rows={3}
            required
          />

          <div className="image-group">
            <label>Images</label>
            {formTour.images.map((img, index) => (
              <div key={index} className="image-row">
                <input
                  type="text"
                  placeholder="Image Description"
                  value={img.description}
                  onChange={(e) => handleImageChange(index, "description", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={img.url}
                  onChange={(e) => handleImageChange(index, "url", e.target.value)}
                />
                <button type="button" className="remove-btn" onClick={() => handleRemoveImageField(index)}>✖</button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={handleAddImageField}>+ Add More Image</button>
          </div>

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
            <th>Start</th>
            <th>End</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Destination</th>
            <th>Images</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.id}</td>
              <td>{tour.title}</td>
              <td>{tour.startDate}</td>
              <td>{tour.endDate}</td>
              <td>{parseInt(tour.price).toLocaleString()} USD</td>
              <td>{tour.capacity}</td>
              <td>{tour.destination?.name || "N/A"}</td>
              <td>
                {tour.images?.length > 0 ? tour.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img.url}
                      alt={img.description || "Image"}
                      style={{ width: "80px", height: "60px", objectFit: "cover", marginBottom: "5px" }}
                    />
                    <div style={{ fontSize: "0.75rem" }}>{img.description}</div>
                  </div>
                )) : "No Images"}
              </td>
              <td>{tour.status || "Active"}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditTour(tour)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteTour(tour.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourManagement;
