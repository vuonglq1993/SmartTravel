import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Success.css";

const Success = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [message, setMessage] = useState("Processing your payment...");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const bookingId = searchParams.get("bookingId");
    const customerEmail = searchParams.get("email") || "lqv571993@gmail.com";

    if (!paymentId || !payerId) {
      setError("❌ Missing payment information.");
      return;
    }

    const alreadyExecuted = localStorage.getItem(`executed-${paymentId}`);
    if (alreadyExecuted === "done") {
      setSuccess(true);
      setMessage("✅ Payment has already been confirmed.");
      return;
    }

    const runSuccessFlow = async () => {
      try {
        // 1. Execute PayPal payment
        const executeRes = await fetch(`http://localhost:8080/api/paypal/execute?paymentId=${paymentId}&PayerID=${payerId}`);
        if (!executeRes.ok) throw new Error("Failed to confirm PayPal payment");
        await executeRes.json();

        // 2. Send confirmation email
        await axios.post("http://localhost:8080/api/email/send", {
          from: "lqv1993@gmail.com",
          to: customerEmail,
          subject: "Thank you for your payment!",
          body: `
            <h2>Payment Successful</h2>
            <p>We have received your order and confirmed your booking.</p>
            <p>Thank you for choosing our service!</p>
          `,
        });

        // 3. Update booking status
        if (!bookingId) throw new Error("Missing booking ID to confirm.");
        await axios.put(`http://localhost:8080/api/bookings/${bookingId}/confirm`);

        // 4. Visual feedback
        setSuccess(true);
        setMessage("🎉 Payment successful! Your booking is now confirmed.");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        localStorage.setItem(`executed-${paymentId}`, "done");

        // 5. Clean query params
        const url = new URL(window.location.href);
        url.search = "";
        window.history.replaceState({}, document.title, url.toString());
      } catch (err) {
        console.error("❌ Error during success flow:", err);
        setError("❌ Payment confirmation failed: " + err.message);
      }
    };

    runSuccessFlow();
  }, [searchParams]);

  return (
    <div className="sky-bg">
      <div className="success-card">
        <div className="checkmark-circle">
          <svg viewBox="0 0 52 52">
            <path className="circle" d="M26 1 C12 1 1 12 1 26s11 25 25 25 25-11 25-25S40 1 26 1z" />
            {error ? (
              <path
                className="cross"
                d="M16 16 L36 36 M36 16 L16 36"
                stroke="#e74c3c"
                strokeWidth="4"
                fill="none"
              />
            ) : (
              <path className="check" d="M14 27l7 7 16-16" />
            )}
          </svg>
        </div>

        <h2>{error ? "Payment Failed" : message}</h2>

        {success && !error && (
          <p className="sub">
            Thank you! Your tour has been recorded. See you on your next journey! ✈️
          </p>
        )}
      </div>
    </div>
  );
};

export default Success;
