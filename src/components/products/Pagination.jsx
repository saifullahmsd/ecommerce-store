import React from "react";
import { CaretLeft, CaretRight } from "phosphor-react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretLeft size={20} />
      </button>

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 disabled:opacity-50"
      >
        <CaretRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
