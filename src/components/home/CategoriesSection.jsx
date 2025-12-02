import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/dummyProductsApi";
import Skeleton from "../shared/Skeleton";
import { CaretRight } from "phosphor-react";

const CategoriesSection = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  // Pick top 8 categories to display on home
  const displayCategories = categories ? categories.slice(0, 8) : [];

  if (isError)
    return <div className="text-red-500">Failed to load categories.</div>;

  return (
    <section className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Shop by Category</h2>
        <Link
          to="/categories"
          className="flex items-center text-sm font-semibold text-primary hover:underline"
        >
          View All <CaretRight weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {isLoading
          ? [...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))
          : displayCategories.map((cat, index) => (
              <Link
                key={index}
                // Navigate to products page with category filter (Logic handled in Day 5)
                to={`/products?category=${cat}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                {/* Random colored circle as icon placeholder */}
                <div
                  className={`mb-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors`}
                >
                  <span className="text-lg font-bold">
                    {cat.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-center text-xs font-semibold capitalize text-gray-700 group-hover:text-primary">
                  {cat.replace("-", " ")}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
