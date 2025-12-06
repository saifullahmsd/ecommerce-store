import React from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash } from "phosphor-react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-4 flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700 sm:flex-row sm:justify-between sm:mb-0 sm:border-0 sm:shadow-none sm:p-0 sm:py-6 sm:border-b">
      {/* 1. Image & Title */}
      <div className="flex w-full items-center gap-4 sm:w-1/2">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200 dark:bg-slate-900 dark:border-slate-700">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 line-clamp-2 dark:text-gray-100">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* 2. Controls Row */}
      <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start sm:gap-6">
        {/* Quantity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            aria-label="Decrease quantity"
            className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 active:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            <Minus size={16} weight="bold" />
          </button>
          <span className="w-8 text-center font-medium dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
            aria-label="Increase quantity"
            className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 active:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            <Plus size={16} weight="bold" />
          </button>
        </div>

        {/* Subtotal & Trash */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-800 dark:text-gray-100">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            aria-label={`remove ${item.title} from cart`}
            className="rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
