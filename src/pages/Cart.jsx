import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Trash } from "phosphor-react";
import { clearCart } from "../features/cart/cartSlice";

// Components
import CartItem from "../components/cart/cartItem";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="mt-4 rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Shopping Cart</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* LEFT: Cart Items List */}
        <div className="w-full lg:w-2/3">
          {/* Header Actions */}
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="font-semibold text-gray-600">
              {items.length} Items
            </span>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to clear the cart?")
                ) {
                  dispatch(clearCart());
                }
              }}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
            >
              <Trash size={16} /> Clear Cart
            </button>
          </div>

          {/* List */}
          <div className="flex flex-col">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <Link
            to="/products"
            className="mt-6 flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <ArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* RIGHT: Summary */}
        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
