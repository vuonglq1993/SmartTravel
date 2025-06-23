import React, { useEffect, useState } from "react";
import "../styles/TourManagement.css";

const TOURS_API = "http://localhost:8080/api/tours";
const DESTINATIONS_API = "http://localhost:8080/api/destinations";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [tourForm, setTourForm] = useState({
    title: "",
    price: "",
    startDate: "",
    endDate: "",
    duration: "",
    imageUrl: "",
    destinationId: "",
    status: "Active",
  });

  useEffect(() => {
    fetchTours();
    fetchDestinations();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch(TOURS_API);
      if (!res.ok) throw new Error("Failed to fetch tours");
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      const res = await fetch(DESTINATIONS_API);
      if (!res.ok) throw new Error("Failed to fetch destinations");
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const resetForm = () => {
    setTourForm({
      title: "",
      price: "",
      startDate: "",
      endDate: "",
      duration: "",
      imageUrl: "",
      destinationId: "",
      status: "Active",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTourForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      title,
      price,
      startDate,
      endDate,
      duration,
      imageUrl,
      destinationId,
      status,
    } = tourForm;

    if (!title || !price || !startDate || !endDate || !duration || !destinationId) {
      alert("Please fill in all required fields.");
      return;
    }

    const body = {
      title,
      price: parseFloat(price),
      startDate,
      endDate,
      duration: parseInt(duration),
      imageUrl,
      destination: { id: parseInt(destinationId) },
      status,
    };

    try {
      const res = await fetch(editId ? `${TOURS_API}/${editId}` : TOURS_API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        fetchTours();
        resetForm();
      } else {
        console.error("Failed to save tour. Status:", res.status);
      }
    } catch (err) {
      console.error("Error saving tour:", err);
    }
  };

  const handleEdit = (tour) => {
    setEditId(tour.id);
    setTourForm({
      title: tour.title,
      price: tour.price,
      startDate: tour.startDate?.slice(0, 10),
      endDate: tour.endDate?.slice(0, 10),
      duration: tour.duration,
      imageUrl: tour.imageUrl,
      destinationId: tour.destination?.id || "",
      status: tour.status || "Active",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const res = await fetch(`${TOURS_API}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchTours();
      else console.error("Failed to delete tour. Status:", res.status);
    } catch (err) {
      console.error("Error deleting tour:", err);
    }
  };

  return (
    <div className="tour-container">
      <h2>Tour Management</h2>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        + Add New Tour
      </button>

      {showForm && (
        <div className="tour-form">
          <input
            type="text"
            name="title"
            placeholder="Tour Title"
            value={tourForm.title}
            onChange={handleFormChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Tour Price"
            value={tourForm.price}
            onChange={handleFormChange}
          />
          <input
            type="date"
            name="startDate"
            value={tourForm.startDate}
            onChange={handleFormChange}
          />
          <input
            type="date"
            name="endDate"
            value={tourForm.endDate}
            onChange={handleFormChange}
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={tourForm.duration}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={tourForm.imageUrl}
            onChange={handleFormChange}
          />
          <select
            name="destinationId"
            value={tourForm.destinationId}
            onChange={handleFormChange}
          >
            <option value="">-- Select Destination --</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select name="status" value={tourForm.status} onChange={handleFormChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div>
            <button className="save-btn" onClick={handleSubmit}>
              {editId ? "Update" : "Save"}
            </button>
            <button className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="tour-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.id}</td>
              <td>{tour.title}</td>
              <td>{tour.destination?.name || "N/A"}</td>
              <td>{tour.price}</td>
              <td>{tour.startDate?.slice(0, 10)}</td>
              <td>{tour.endDate?.slice(0, 10)}</td>
              <td>{tour.duration} days</td>
              <td>{tour.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(tour)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(tour.id)}>
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

export default TourManagement;
