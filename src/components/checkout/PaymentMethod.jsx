import React from "react";
import { CreditCard, Money } from "phosphor-react";

const PaymentMethod = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
        Payment Method
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Credit Card Option */}
        <div
          onClick={() => setSelectedMethod("card")}
          className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
            selectedMethod === "card"
              ? "border-primary bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <CreditCard
              size={32}
              className={
                selectedMethod === "card"
                  ? "text-primary"
                  : "text-gray-400 dark:text-gray-500"
              }
            />
            <div>
              <p
                className={`font-bold ${
                  selectedMethod === "card"
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Card Payment
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pay with Visa, Mastercard
              </p>
            </div>
          </div>
        </div>

        {/* Cash on Delivery Option */}
        <div
          onClick={() => setSelectedMethod("cod")}
          className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
            selectedMethod === "cod"
              ? "border-primary bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <Money
              size={32}
              className={
                selectedMethod === "cod"
                  ? "text-primary"
                  : "text-gray-400 dark:text-gray-500"
              }
            />
            <div>
              <p
                className={`font-bold ${
                  selectedMethod === "cod"
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Cash on Delivery
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pay when you receive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
