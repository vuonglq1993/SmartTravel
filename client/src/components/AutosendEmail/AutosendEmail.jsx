import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AutoSendEmail() {
  const location = useLocation();

  // Prepare email data from previous page (via location.state)
  const emailData = {
    from: "lqv1993@gmail.com", // Sender's email
    to: location.state?.email || "lqv571993@gmail.com", // Recipient's email (customer)
    subject: "Thank you for your payment!",
    body: `
      <h2>Payment Successful</h2>
      <p>We have received your order.</p>
      <p>Thank you for choosing our service.</p>
    `
  };

  useEffect(() => {
    const sendEmail = async () => {
      if (!emailData.to) {
        console.error("No recipient email address provided.");
        return;
      }

      try {
        // Send email to the backend API
        await axios.post("http://localhost:8080/api/email/send", emailData, {
          headers: { "Content-Type": "application/json" }
        });
        console.log("✅ Email sent automatically!");
      } catch (err) {
        console.error("❌ Failed to send email:", err.response?.data || err.message);
      }
    };

    sendEmail();
  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Order Processed</h2>
      <p>A confirmation email has been sent to: <strong>{emailData.to}</strong></p>
      <p>Thank you for your purchase!</p>
    </div>
  );
}

export default AutoSendEmail;
