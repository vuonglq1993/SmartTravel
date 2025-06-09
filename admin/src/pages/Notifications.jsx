import React, { useState, useEffect } from "react";
import "../styles/Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotif, setNewNotif] = useState({
    message: "",
    email: "",
    subject: "",
  });

  // 1. Load notifications từ backend
  useEffect(() => {
    fetch("http://localhost:8080/api/notifications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notifications");
        return res.json();
      })
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Fetch notifications error:", err));
  }, []);

  // 2. Xử lý input thay đổi
  const handleChange = (e) => {
    setNewNotif({ ...newNotif, [e.target.name]: e.target.value });
  };

  // 3. Gửi notification mới (lưu backend)
  const handleSendNotification = () => {
    if (!newNotif.message.trim()) {
      alert("Vui lòng nhập nội dung thông báo.");
      return;
    }

    const payload = {
      message: newNotif.message,
      target: "All Users", // Hoặc giá trị cố định nếu bạn muốn
      date: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:8080/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send notification");
        return res.json();
      })
      .then((savedNotif) => {
        setNotifications((prev) => [savedNotif, ...prev]);
        setNewNotif({ ...newNotif, message: "" }); // Reset message sau khi gửi
      })
      .catch((err) => alert(err.message));
  };

  // 4. Gửi email qua API /api/email/send
  const handleSendEmail = () => {
    if (!newNotif.email.trim()) {
      alert("Vui lòng nhập email người nhận.");
      return;
    }
    if (!newNotif.subject.trim()) {
      alert("Vui lòng nhập tiêu đề email.");
      return;
    }
    if (!newNotif.message.trim()) {
      alert("Vui lòng nhập nội dung email.");
      return;
    }

    const emailPayload = {
      to: newNotif.email,
      subject: newNotif.subject,
      body: newNotif.message,
    };

    fetch("http://localhost:8080/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send email");
        return res.text();
      })
      .then(() => {
        alert("Email đã được gửi thành công!");
        setNewNotif({ message: "", email: "", subject: "" });
      })
      .catch((err) => alert(err.message));
  };

  // 5. Xoá notification
  const handleDelete = (id) => {
    if (window.confirm("Bạn có muốn xoá thông báo này không?")) {
      fetch(`http://localhost:8080/api/notifications/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete notification");
          setNotifications(notifications.filter((n) => n.id !== id));
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="notif-container">
      <h2>Notifications Management</h2>

      <div className="notif-form">
        <textarea
          name="message"
          placeholder="Nội dung thông báo / email..."
          value={newNotif.message}
          onChange={handleChange}
          rows={4}
        />

        <input
          type="email"
          name="email"
          placeholder="Nhập email để gửi"
          value={newNotif.email}
          onChange={handleChange}
          style={{ marginTop: 10 }}
        />

        <input
          type="text"
          name="subject"
          placeholder="Tiêu đề email"
          value={newNotif.subject}
          onChange={handleChange}
          style={{ marginTop: 10 }}
        />

        <div style={{ marginTop: 15 }}>
          <button onClick={handleSendNotification}>Gửi thông báo (lưu backend)</button>
          <button onClick={handleSendEmail} style={{ marginLeft: 10 }}>
            Gửi email
          </button>
        </div>
      </div>

      <table className="notif-table" style={{ marginTop: 20 }}>
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
                <button className="delete-btn" onClick={() => handleDelete(n.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
