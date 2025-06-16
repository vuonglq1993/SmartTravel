import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Success.css";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý thanh toán...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (!paymentId || !payerId) {
      setError("Thiếu thông tin thanh toán.");
      return;
    }

    if (localStorage.getItem(`executed-${paymentId}`)) {
      setMessage("✅ Thanh toán đã hoàn tất.");
      return;
    }

    fetch(
      `http://localhost:8080/api/paypal/execute?paymentId=${paymentId}&PayerID=${payerId}`,
      { method: "GET" }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi xác nhận thanh toán.");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem(`executed-${paymentId}`, "done");
        setMessage("🎉 Thanh toán thành công! Cảm ơn bạn đã đặt tour.");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      })
      .catch((err) => {
        setError("❌ Lỗi xác nhận: " + err.message);
      });
  }, [searchParams]);

  return (
    <div className="sky-bg">
      <div className="success-card">
        <div className="checkmark-circle">
          <svg viewBox="0 0 52 52">
            <path className="circle" d="M26 1 C12 1 1 12 1 26s11 25 25 25 25-11 25-25S40 1 26 1z" />
            <path className="check" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <h2>{error ? "Thanh toán thất bại" : "Thanh toán thành công"}</h2>
        <p>{error || message}</p>
        {!error && <p className="sub">Cảm ơn bạn! Tour đã được ghi nhận. Hẹn gặp lại trên hành trình tiếp theo! ✈️</p>}
      </div>
    </div>
  );
};

export default Success;
