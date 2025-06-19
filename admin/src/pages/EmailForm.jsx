  import { useState, useEffect } from "react";
  import axios from "axios";

  function EmailSender() {
    const [emailData, setEmailData] = useState({
      from: "lqv1993@gmail.com",
      to: "",
      subject: "",
      body: ""
    });

    const [notifications, setNotifications] = useState([]);

    // Load notifications từ backend
    useEffect(() => {
      axios.get("http://localhost:8080/api/notifications")
        .then((res) => setNotifications(res.data))
        .catch((err) => {
          console.error("❌ Failed to load notifications:", err.message);
        });
    }, []);

    // Xử lý input thay đổi
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmailData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    // Gửi email
    const handleSend = async () => {
      try {
        await axios.post("http://localhost:8080/api/email/send", emailData, {
          headers: { "Content-Type": "application/json" }
        });
        alert("✅ Email sent successfully!");
        setEmailData(prev => ({ ...prev, to: "", subject: "", body: "" }));
      } catch (err) {
        console.error("❌ Failed to send email:", err.response?.data || err.message);
        alert("❌ Failed to send email. Check console for details.");
      }
    };

    return (
      <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
        <h2>Gửi Email</h2>

        <input
          name="from"
          placeholder="Người gửi (email)"
          value={emailData.from}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          name="to"
          placeholder="Người nhận (email)"
          value={emailData.to}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
        />

        <input
          name="subject"
          placeholder="Tiêu đề"
          value={emailData.subject}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
        />

        <textarea
          name="body"
          placeholder="Nội dung email (có thể dùng HTML)"
          value={emailData.body}
          onChange={handleChange}
          rows={6}
          style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
        />

        <button onClick={handleSend} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Gửi Email
        </button>

        {/* Hiển thị danh sách thông báo */}
        <h3 style={{ marginTop: 40 }}>Danh sách thông báo</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Nội dung</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Target</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif) => (
              <tr key={notif.id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{notif.id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{notif.message}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{notif.target}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{notif.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default EmailSender;
