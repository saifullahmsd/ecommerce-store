import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "phosphor-react";

const OrderSuccess = () => {
  const orderId = Math.floor(Math.random() * 1000000);
  // Generate random Order ID

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6 text-green-500">
        <CheckCircle size={64} weight="fill" />
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Order Placed Successfully!
      </h1>
      <p className="mb-8 max-w-md text-gray-500">
        Thank you for your purchase. Your order{" "}
        <span className="font-bold text-gray-800">#{orderId}</span> has been
        confirmed.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/products"
          className="rounded-full bg-primary px-8 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
        <Link
          to="/" // In future, this could go to /profile/orders
          className="rounded-full border border-gray-300 px-8 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
