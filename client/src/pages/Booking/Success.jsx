import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Success.css";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Processing your payment...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    if (!paymentId || !payerId) {
      setError("Missing payment information.");
      return;
    }

    if (localStorage.getItem(`executed-${paymentId}`)) {
      setMessage("✅ Payment has already been completed.");
      return;
    }

    fetch(
      `http://localhost:8080/api/paypal/execute?paymentId=${paymentId}&PayerID=${payerId}`,
      { method: "GET" }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error while confirming the payment.");
        return res.json();
      })
      .then(() => {
        localStorage.setItem(`executed-${paymentId}`, "done");
        setMessage("🎉 Payment successful! Thank you for booking the tour.");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      })
      .catch((err) => {
        setError("❌ Confirmation error: " + err.message);
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
        <h2>{error ? "Payment Failed" : "Payment Successful"}</h2>
        <p>{error || message}</p>
        {!error && (
          <p className="sub">
            Thank you! Your tour has been recorded. See you on your next journey! ✈️
          </p>
        )}
      </div>
    </div>
  );
};

export default Success;
