// ✅ Success.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý thanh toán...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");

    if (!paymentId) {
      setError("Thiếu thông tin thanh toán.");
      return;
    }

    if (localStorage.getItem(`executed-${paymentId}`)) {
      setMessage("✅ Thanh toán đã hoàn tất.");
      return;
    }

    // Không cần gọi execute nếu PayPal đã xử lý rồi
    localStorage.setItem(`executed-${paymentId}`, "done");
    setMessage("🎉 Thanh toán thành công! Cảm ơn bạn đã đặt tour.");
  }, [searchParams]);

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1>{error ? error : message}</h1>
    </div>
  );
};

export default Success;
