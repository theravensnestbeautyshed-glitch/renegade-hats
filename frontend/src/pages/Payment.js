import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { useCart } from "../context/CartContext";

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const sid = params.get("session_id");
  const [state, setState] = useState("checking");
  const { clear } = useCart();

  useEffect(() => {
    if (!sid) {
      setState("error");
      return undefined;
    }
    let tries = 0;
    let timer;
    let alive = true;
    const poll = async () => {
      try {
        const { data } = await api.get(`/payments/status/${sid}`);
        if (!alive) return;
        if (data?.payment_status === "paid") {
          setState("paid");
          clear();
          sessionStorage.removeItem("renegade_checkout_sid");
          return;
        }
        if (data?.status === "expired") {
          setState("error");
          return;
        }
      } catch {
        /* keep polling */
      }
      tries += 1;
      if (tries < 10) timer = setTimeout(poll, 2000);
      else if (alive) setState("pending");
    };
    poll();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [sid, clear]);

  const copy = {
    checking: ["Confirming…", "Hold tight while we confirm your payment."],
    paid: ["It's Yours.", "Payment confirmed. Your one-of-a-kind Renegade Hat is now spoken for — we'll email you shipping details shortly."],
    pending: ["Almost There", "Your payment is still processing. You'll receive a confirmation email once it's complete."],
    error: ["Something Went Sideways", "We couldn't confirm this payment. If you were charged, please contact us."],
  }[state];

  return (
    <div className="tex-leather flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center" data-testid="payment-success-page">
      <h1 className="font-rye text-5xl text-[#C87D53] sm:text-6xl" data-testid="payment-status-title">{copy[0]}</h1>
      <p className="mt-6 text-lg text-[#F2EADB]/85" data-testid="payment-status-text">{copy[1]}</p>
      <Link to="/shop" className="btn-ghost mt-10" data-testid="payment-back-shop">Back to the Shop</Link>
    </div>
  );
}

export function PaymentCancel() {
  useEffect(() => {
    const sid = sessionStorage.getItem("renegade_checkout_sid");
    if (sid) {
      sessionStorage.removeItem("renegade_checkout_sid");
      api.post(`/payments/release/${sid}`).catch(() => {});
    }
  }, []);
  return (
    <div className="tex-leather flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center" data-testid="payment-cancel-page">
      <h1 className="font-rye text-5xl text-[#C87D53] sm:text-6xl">Checkout Cancelled</h1>
      <p className="mt-6 text-lg text-[#F2EADB]/85">No charge was made. Your hats are still in your cart and have been released for checkout again.</p>
      <Link to="/shop" className="btn-primary mt-10" data-testid="payment-cancel-back">Return to Shop</Link>
    </div>
  );
}
