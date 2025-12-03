import React from "react";
import { WarningCircle, ArrowClockwise } from "phosphor-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 rounded-full bg-red-50 p-3 text-red-500">
        <WarningCircle size={32} />
      </div>
      <h3 className="text-lg font-bold text-gray-800">
        Oops! Something went wrong
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        {message ||
          "We failed to fetch the data. Please check your connection."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-primary"
        >
          <ArrowClockwise size={16} /> Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
