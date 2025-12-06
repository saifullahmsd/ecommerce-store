import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "phosphor-react";

const CartSummary = () => {
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const shipping = totalAmount > 50 ? 0 : 10;
  const tax = totalAmount * 0.05;
  const finalTotal = totalAmount + shipping + tax;

  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <h2 className="mb-6 text-lg font-bold text-gray-800 dark:text-white">
        Order Summary
      </h2>

      <div className="space-y-4 border-b border-gray-100 pb-6 dark:border-slate-700">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal ({totalQuantity} items)</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-500/30"
      >
        Proceed to Checkout <ArrowRight weight="bold" />
      </button>

      <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Secure Checkout - SSL Encrypted
      </p>
    </div>
  );
};

export default CartSummary;
