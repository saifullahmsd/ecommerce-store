import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

const CartSummary = () => {
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const shipping = totalAmount > 50 ? 0 : 10; // Simple logic: Free shipping over $50
  const tax = totalAmount * 0.05; // 5% tax example
  const finalTotal = totalAmount + shipping + tax;

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout"); // Or /checkout later
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-gray-800">Order Summary</h2>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalQuantity} items)</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between text-xl font-bold text-gray-900">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Proceed to Checkout <ArrowRight weight="bold" />
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Secure Checkout - SSL Encrypted
      </p>
    </div>
  );
};

export default CartSummary;
