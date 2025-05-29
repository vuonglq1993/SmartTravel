import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Admin" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
    { id: 3, name: "Lê Văn C", email: "c@example.com", role: "User" },
  ]);

  const [formUser, setFormUser] = useState({ id: null, name: "", email: "", role: "User" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!formUser.name || !formUser.email) return;
    setUsers([...users, { ...formUser, id: Date.now() }]);
    setFormUser({ id: null, name: "", email: "", role: "User" });
    setShowForm(false);
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormUser(user);
    setShowForm(true);
  };

  const handleUpdateUser = () => {
    setUsers(users.map((u) => (u.id === formUser.id ? formUser : u)));
    setFormUser({ id: null, name: "", email: "", role: "User" });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="user-container">
        <h2>User Management</h2>
        <button className="add-btn" onClick={() => { setShowForm(true); setIsEditing(false); }}>+ Add User</button>

        {showForm && (
          <div className="user-form">
            <input type="text" name="name" placeholder="Name" value={formUser.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formUser.email} onChange={handleInputChange} />
            <select name="role" value={formUser.role} onChange={handleInputChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div>
              {isEditing ? (
                <button className="edit-btn" onClick={handleUpdateUser}>Update</button>
              ) : (
                <button className="add-btn" onClick={handleAddUser}>Add</button>
              )}
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
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
      <Footer />
    </>
  );
};

export default UserManagement;
