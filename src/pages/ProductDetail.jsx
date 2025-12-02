import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
} from "../api/dummyProductsApi";
import {
  Star,
  Truck,
  ShieldCheck,
  ArrowCounterClockwise,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
} from "phosphor-react";
// import { toast } from "react-hot-toast";

// Components
import ImageGallery from "../components/product-detail/ImageGallery";
import Reviews from "../components/product-detail/Reviews";
import ReviewForm from "../components/product-detail/ReviewForm"; // <--- New Import
import ProductCard from "../components/shared/ProductCard";
import Skeleton from "../components/shared/Skeleton";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. Fetch Product
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  // 2. Local States
  const [quantity, setQuantity] = useState(1);
  const [allReviews, setAllReviews] = useState([]); // Stores API + Local reviews
  const [avgRating, setAvgRating] = useState(0);

  // 3. Effect: Combine API Data + LocalStorage Data
  useEffect(() => {
    if (product) {
      // Get Local Reviews for this specific ID
      const savedReviews = JSON.parse(
        localStorage.getItem("product_reviews") || "[]"
      );
      const localReviewsForThisProduct = savedReviews.filter(
        (r) => r.productId === parseInt(id)
      );

      // Merge API reviews and Local reviews
      const apiReviews = product.reviews || [];
      const combined = [...localReviewsForThisProduct, ...apiReviews]; // Local first (newest)

      setAllReviews(combined);

      // Recalculate Average Rating
      if (combined.length > 0) {
        const total = combined.reduce((acc, r) => acc + r.rating, 0);
        setAvgRating((total / combined.length).toFixed(1));
      } else {
        setAvgRating(product.rating);
      }
    }
  }, [product, id]);

  // 4. Fetch Related Products
  const { data: relatedData } = useGetAllProductsQuery(
    { category: product?.category, limit: 4 },
    { skip: !product }
  );

  // Handlers
  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
    if (type === "inc" && quantity < (product?.stock || 10))
      setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // Note: Assuming you fixed the slice in Day 8 instructions, passing quantity directly
    dispatch(addToCart({ ...product, quantityToAdd: quantity }));
  };

  const handleReviewSubmit = (newReview) => {
    // 1. Add to Local State (Immediate UI update)
    const updatedReviews = [newReview, ...allReviews];
    setAllReviews(updatedReviews);

    // 2. Recalculate Average
    const total = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
    setAvgRating((total / updatedReviews.length).toFixed(1));

    // 3. Save to LocalStorage
    const allSavedReviews = JSON.parse(
      localStorage.getItem("product_reviews") || "[]"
    );
    localStorage.setItem(
      "product_reviews",
      JSON.stringify([newReview, ...allSavedReviews])
    );
  };

  if (isLoading)
    return (
      <div className="container mx-auto p-10">
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  if (isError || !product)
    return (
      <div className="p-10 text-center text-red-500">Product not found</div>
    );

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const stockColor = product.stock < 10 ? "text-red-500" : "text-green-600";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize text-gray-800">{product.category}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left: Gallery */}
        <ImageGallery images={product.images} thumbnail={product.thumbnail} />

        {/* Right: Info */}
        <div className="flex flex-col">
          <span className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
            {product.brand || "Generic Brand"}
          </span>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Rating (Dynamic) */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex text-yellow-400">
              <Star weight="fill" />
              <span className="ml-1 font-bold text-gray-700">{avgRating}</span>
            </div>
            <span className="text-sm text-gray-400">
              | {allReviews.length} Reviews
            </span>
            <span className={`text-sm font-medium ml-4 ${stockColor}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </span>
          </div>

          {/* Pricing */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="mb-1 text-lg text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="mb-1 rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Includes all taxes. Free shipping on orders over $50.
            </p>
          </div>

          <p className="mb-8 leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* Cart Buttons */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row border-b border-gray-100 pb-8">
            <div className="flex items-center rounded-lg border border-gray-200">
              <button
                onClick={() => handleQuantityChange("dec")}
                className="px-4 py-3 hover:bg-gray-100"
              >
                <Minus />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("inc")}
                className="px-4 py-3 hover:bg-gray-100"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none"
            >
              <ShoppingCart size={20} weight="bold" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button className="rounded-lg border border-gray-200 p-3 text-gray-400 hover:text-red-500">
              <Heart size={24} weight="bold" />
            </button>
          </div>

          {/* Trust Badges... (Keep existing code) */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={24} className="text-primary" />{" "}
              <span>Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck size={24} className="text-primary" />{" "}
              <span>2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ArrowCounterClockwise size={24} className="text-primary" />{" "}
              <span>30 Days Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: Reviews List */}
        <div className="lg:col-span-2">
          <Reviews reviews={allReviews} />
        </div>

        {/* Right: Write Review Form */}
        <div>
          <ReviewForm
            productId={parseInt(id)}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
      </div>

      {/* Related Products */}
      {relatedData?.products?.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedData.products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
