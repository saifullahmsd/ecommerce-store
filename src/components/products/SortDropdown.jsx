import React from "react";

const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        Sort By:
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Name: A-Z</option>
        <option value="title-desc">Name: Z-A</option>
      </select>
    </div>
  );
};

export default SortDropdown;
