import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
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

    // Step 1: Execute payment
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
        setMessage("🎉 Payment successful! A confirmation email has been sent.");

        // 🧹 Remove query params from URL
        window.history.replaceState(null, "", "/success");

        // Step 2: Auto send email
        const emailData = {
          from: "lqv1993@gmail.com",
          to: location.state?.email || "lqv571993@gmail.com",
          subject: "Thank you for your payment!",
          body: `
            <h2>Payment Successful</h2>
            <p>We have received your order.</p>
            <p>Thank you for choosing our service.</p>
          `,
        };

        return axios.post("http://localhost:8080/api/email/send", emailData, {
          headers: { "Content-Type": "application/json" },
        });
      })
      .then(() => {
        console.log("✅ Email sent automatically!");
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        setError("❌ An error occurred: " + err.message);
      });
  }, [searchParams, location.state]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{error ? "Payment Failed" : "Payment Successful"}</h2>
      <p>{error || message}</p>
    </div>
  );
};

export default Success;
