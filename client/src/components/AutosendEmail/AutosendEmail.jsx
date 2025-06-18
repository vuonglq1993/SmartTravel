import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AutoSendEmail() {
  const location = useLocation();

  const emailData = {
    from: "lqv1993@gmail.com", // hoặc có thể config riêng
    to: location.state?.email || "lqv571993@gmail.com", // email khách hàng
    subject: "Cảm ơn bạn đã thanh toán!",
    body: `
      <h2>Thanh toán thành công</h2>
      <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
    `
  };

  useEffect(() => {
    const sendEmail = async () => {
      if (!emailData.to) {
        console.error("Không có địa chỉ email để gửi.");
        return;
      }

      try {
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
      <h2>Đơn hàng đã được xử lý</h2>
      <p>Email xác nhận đã được gửi đến: <strong>{emailData.to}</strong></p>
      <p>Cảm ơn bạn đã mua hàng!</p>
    </div>
  );
}

export default AutoSendEmail;
