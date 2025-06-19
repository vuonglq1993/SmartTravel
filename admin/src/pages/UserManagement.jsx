import React, { useEffect, useState } from "react";
import "../styles/UserManagement.css";

const API_URL = "http://localhost:8080/api/admin/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formUser, setFormUser] = useState({ id: null, name: "", email: "", role: "User" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi khi fetch users:", err);
    }
  };
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

  const handleInputChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
  if (!formUser.name.trim() || !formUser.email.trim()) {
    setError("Vui lòng nhập đầy đủ tên và email.");
    return;
  }
  if (!isValidEmail(formUser.email)) {
    setError("Email không đúng định dạng.");
    return;
  }
  setError("");
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formUser),
    });
    if (res.ok) {
      fetchUsers();
      resetForm();
    }
  } catch (err) {
    console.error("Lỗi khi thêm user:", err);
  }
};


  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormUser(user);
    setShowForm(true);
    setError("");
  };

  const handleUpdateUser = async () => {
  if (!formUser.name.trim() || !formUser.email.trim()) {
    setError("Vui lòng nhập đầy đủ tên và email.");
    return;
  }
  if (!isValidEmail(formUser.email)) {
    setError("Email không đúng định dạng.");
    return;
  }
  setError("");
  try {
    const res = await fetch(`${API_URL}/${formUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formUser),
    });
    if (res.ok) {
      fetchUsers();
      resetForm();
    }
  } catch (err) {
    console.error("Lỗi khi cập nhật user:", err);
  }
};


  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchUsers();
        }
      } catch (err) {
        console.error("Lỗi khi xoá user:", err);
      }
    }
  };

  const resetForm = () => {
    setFormUser({ id: null, name: "", email: "", role: "User" });
    setIsEditing(false);
    setShowForm(false);
    setError("");
  };

  return (
    <div className="user-container">
      <h2>User Management</h2>

      {showForm && (
        <div className="user-form">
          <input type="text" name="name" placeholder="Name" value={formUser.name} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formUser.email} onChange={handleInputChange} />
          <select name="role" value={formUser.role} onChange={handleInputChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {error && <p className="error-message">{error}</p>}
          <div>
            {isEditing ? (
              <button className="edit-btn" onClick={handleUpdateUser}>Update</button>
            ) : (
              <button className="add-btn" onClick={handleAddUser}>Add</button>
            )}
            <button className="cancel-btn" onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
