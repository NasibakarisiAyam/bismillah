import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { formatIdr } from "../utils/currency";

const stripePromise = loadStripe(
  "pk_test_51RqEXtRugG4wyDpiIl9vn4E8c0QuFsryezGk7AGg85wE2fmcbKo0PD9NRa6ncbIyZhD6I3ESS95WfJG9XvOHLiwb00Wf7czvPw"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = formatIdr(subtotal);
  const formattedTotal = formatIdr(total);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe error:", result.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <motion.div
      className="space-y-6 rounded-xl border border-brown-600 bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-brown-700">Ringkasan Pesanan</h2>

      <div className="space-y-3 text-gray-800 text-sm">
        <SummaryRow label="Harga Asli" value={formattedSubtotal} />
        {savings > 0 && (
          <SummaryRow label="Hemat" value={`- ${formattedSavings}`} valueClass="text-green-600" />
        )}
        {coupon && isCouponApplied && (
          <SummaryRow label={`Kupon (${coupon.code})`} value={`- ${coupon.discountPercentage}%`} valueClass="text-green-600" />
        )}
        <div className="border-t border-gray-300 pt-2">
          <SummaryRow label="Total" value={formattedTotal} valueClass="text-brown-700 font-bold" />
        </div>
      </div>

      <motion.button
        onClick={handlePayment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full rounded-lg bg-brown-600 px-5 py-2.5 text-white font-medium hover:bg-brown-700 transition"
      >
        Lanjut ke Pembayaran
      </motion.button>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-500">atau</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-brown-600 hover:text-brown-700"
        >
          Lanjutkan Belanja
          <MoveRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

const SummaryRow = ({ label, value, valueClass = "" }) => (
  <dl className="flex items-center justify-between">
    <dt className="text-gray-600">{label}</dt>
    <dd className={`font-medium ${valueClass}`}>{value}</dd>
  </dl>
);

export default OrderSummary;
