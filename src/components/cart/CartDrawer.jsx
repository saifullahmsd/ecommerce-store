import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, Trash, Plus, Minus, ShoppingBag } from "phosphor-react";
import {
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, isCartOpen } = useSelector((state) => state.cart);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout"); // Or /checkout later
  };

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. Slide-out Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-bold text-gray-800">
              Shopping Cart ({items.length})
            </h2>
            <button
              onClick={() => dispatch(closeCart())}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-gray-500">
                <ShoppingBag size={64} className="text-gray-300" />
                <p>Your cart is empty</p>
                <button
                  onClick={() => dispatch(closeCart())}
                  className="font-semibold text-primary hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Image */}
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-gray-200">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="mb-4 flex justify-between text-lg font-bold text-gray-900">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 text-center">
                Shipping & taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full rounded-full bg-primary py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-blue-700"
              >
                Checkout Now
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                  dispatch(closeCart());
                }}
                className="mt-3 w-full text-sm font-semibold text-gray-600 hover:text-gray-900"
              >
                View Cart Page
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
