import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { Heart } from "phosphor-react";
import { addToCart } from "../../features/cart/cartSlice";
import LazyImage from "./LazyImage";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Check if item is in wishlist
  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to detail page
    dispatch(addToCart(product));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* Image Area */}
      <div className="relative flex h-48 items-center justify-center bg-gray-50 p-4">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full rounded-md"
        />
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-red-500"
        >
          <Heart
            size={20}
            weight={isWishlisted ? "fill" : "regular"}
            className={isWishlisted ? "text-red-500" : ""}
          />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-grow flex-col p-4">
        {/* Brand (Optional) */}
        <span className="mb-1 text-xs font-medium text-gray-400">
          {product.brand || "Generic"}
        </span>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1">
          <Star weight="fill" className="text-yellow-400" size={14} />
          <span className="text-xs text-gray-500">{product.rating} (120)</span>
        </div>

        {/* Price & Action - Pushed to bottom */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="block text-lg font-bold text-primary">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                $
                {Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                )}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-full bg-gray-100 p-2 text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ShoppingCart size={20} weight="bold" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
