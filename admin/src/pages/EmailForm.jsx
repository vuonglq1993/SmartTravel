import { useState } from "react";
import axios from "axios";

function EmailSender() {
  const [emailData, setEmailData] = useState({
    from: "lqv1993@gmail.com",
    to: "",
    subject: "",
    body: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = async () => {
    try {
      await axios.post("http://localhost:8080/api/email/send", emailData, {
        headers: { "Content-Type": "application/json" }
      });
      alert("✅ Email sent successfully!");
    } catch (err) {
      console.error("❌ Failed to send email:", err.response?.data || err.message);
      alert("❌ Failed to send email. Check console for details.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Send Email</h2>
      <input
        name="from"
        placeholder="From (email)"
        value={emailData.from}
        onChange={handleChange}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />
      <input
        name="to"
        placeholder="To (email)"
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
        placeholder="Email body (HTML allowed)"
        value={emailData.body}
        onChange={handleChange}
        rows={6}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }}
      />
      <button onClick={handleSend} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Send Email
      </button>
    </div>
  );
}

export default EmailSender;
