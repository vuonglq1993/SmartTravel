import React, { useState } from "react";

import "../styles/Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Chúc mừng năm mới! Ưu đãi 20% cho tất cả các tour.",
      target: "All Users",
      date: "2024-12-30",
    },
  ]);

  const [newNotif, setNewNotif] = useState({ message: "", target: "All Users" });

  const handleChange = (e) => {
    setNewNotif({ ...newNotif, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!newNotif.message.trim()) return alert("Vui lòng nhập nội dung.");
    const newItem = {
      id: Date.now(),
      ...newNotif,
      date: new Date().toISOString().split("T")[0],
    };
    setNotifications([newItem, ...notifications]);
    setNewNotif({ message: "", target: "All Users" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xoá thông báo này không?")) {
      setNotifications(notifications.filter((n) => n.id !== id));
    }
  };

  return (
    <>
      
      <div className="notif-container">
        <h2>Notifications Management</h2>

        <div className="notif-form">
          <textarea
            name="message"
            placeholder="Nội dung thông báo..."
            value={newNotif.message}
            onChange={handleChange}
          ></textarea>
          <select name="target" value={newNotif.target} onChange={handleChange}>
            <option value="All Users">All Users</option>
            <option value="Admin Only">Admin Only</option>
          </select>
          <button onClick={handleSend}>Gửi thông báo</button>
        </div>

        <table className="notif-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Target</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.message}</td>
                <td>{n.target}</td>
                <td>{n.date}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(n.id)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
};

export default Notifications;
