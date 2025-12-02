import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "phosphor-react";
import ProductCard from "../components/shared/ProductCard";

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-300">
          <Heart size={48} weight="fill" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500">Save items you want to buy later!</p>
        <Link
          to="/products"
          className="mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        My Wishlist ({items.length})
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
