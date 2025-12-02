import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../api/dummyProductsApi";
import ProductCard from "../shared/ProductCard";
import Skeleton from "../shared/Skeleton";

const FeaturedProducts = () => {
  // Fetch only 8 products for the featured section
  const { data, isLoading, isError } = useGetAllProductsQuery({ limit: 8 });

  if (isError)
    return (
      <div className="py-10 text-center text-red-500">
        Something went wrong fetching products.
      </div>
    );

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Featured Products</h2>
        <p className="mt-2 text-gray-500">Handpicked selections just for you</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? [...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/products"
          className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
