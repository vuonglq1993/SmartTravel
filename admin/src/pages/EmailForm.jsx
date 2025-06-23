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
  const [contactMessages, setContactMessages] = useState([]);

  // Load notifications & contact messages from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => {
        console.error("❌ Failed to load notifications:", err.message);
      });

    axios.get("http://localhost:8080/api/contact")
      .then((res) => setContactMessages(res.data))
      .catch((err) => {
        console.error("❌ Failed to load contact messages:", err.message);
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send email
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
      <h2>Send Email</h2>

      <input
        name="from"
        placeholder="Sender (email)"
        value={emailData.from}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        name="to"
        placeholder="Recipient (email)"
        value={emailData.to}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />

      <input
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />

      <textarea
        name="body"
        placeholder="Email content (HTML supported)"
        value={emailData.body}
        onChange={handleChange}
        rows={6}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />

      <button onClick={handleSend} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Send Email
      </button>


      {/* Contact Messages */}
      <h3 style={{ marginTop: 40 }}>Contact Messages</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {contactMessages.map((msg) => (
            <tr key={msg.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{msg.email}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailSender;