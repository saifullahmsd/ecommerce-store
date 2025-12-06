import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
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
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        to={`/products/${product.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-slate-800 dark:border-slate-700"
      >
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-gray-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 dark:bg-slate-900/80 dark:text-gray-400 dark:hover:text-red-500"
        >
          <Heart
            size={20}
            weight={isWishlisted ? "fill" : "regular"}
            className={isWishlisted ? "text-red-500" : ""}
          />
        </button>

        {/* Image Area */}
        <div className="relative flex h-48 items-center justify-center bg-gray-50 p-4 dark:bg-slate-900/50">
          <LazyImage
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full rounded-md object-contain mix-blend-multiply dark:mix-blend-normal"
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-grow flex-col p-4">
          <span className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">
            {product.brand || "Generic"}
          </span>

          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
            {product.title}
          </h3>

          <div className="mb-3 flex items-center gap-1">
            <Star weight="fill" className="text-yellow-400" size={14} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.rating} ({product.reviews?.length || 120})
            </span>
          </div>

          {/* Price & Action */}
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

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
              className="rounded-full bg-gray-100 p-2 text-primary transition-colors hover:bg-primary hover:text-white dark:bg-slate-700 dark:text-blue-400 dark:hover:bg-primary dark:hover:text-white"
            >
              <ShoppingCart size={20} weight="bold" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
