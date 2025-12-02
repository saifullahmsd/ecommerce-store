import React from "react";
import { useGetCategoriesQuery } from "../../api/dummyProductsApi";
import { X, Funnel } from "phosphor-react";
import Skeleton from "../shared/Skeleton";

const FilterSidebar = ({
  filters,
  setFilters,
  clearFilters,
  isOpen,
  closeSidebar,
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({ ...prev, category: cat, page: 1 })); // Reset page on filter change
    if (window.innerWidth < 768) closeSidebar();
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out md:static md:block md:w-full md:transform-none md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-6 flex items-center justify-between md:hidden">
          <span className="text-lg font-bold">Filters</span>
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="mb-6 w-full rounded-lg border border-red-500 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          Reset All Filters
        </button>

        {/* 1. Categories */}
        <div className="mb-8">
          <h3 className="mb-3 font-bold text-gray-800">Categories</h3>
          <div className="flex max-h-60 flex-col overflow-y-auto pr-2 custom-scrollbar">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`mb-2 text-left text-sm hover:text-primary ${
                !filters.category || filters.category === "all"
                  ? "font-bold text-primary"
                  : "text-gray-600"
              }`}
            >
              All Products
            </button>

            {isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              categories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`mb-2 text-left text-sm capitalize hover:text-primary ${
                    filters.category === cat
                      ? "font-bold text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {cat.replace("-", " ")}
                </button>
              ))
            )}
          </div>
        </div>

        {/* 2. Price Range */}
        <div className="mb-8">
          <h3 className="mb-3 font-bold text-gray-800">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handlePriceChange}
              className="w-full rounded border p-2 text-sm focus:border-primary focus:outline-none"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full rounded border p-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* 3. Rating */}
        <div>
          <h3 className="mb-3 font-bold text-gray-800">Min Rating</h3>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minRating: e.target.value }))
            }
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 Stars</span>
            <span className="font-bold text-primary">
              {filters.minRating}+ Stars
            </span>
            <span>5 Stars</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
