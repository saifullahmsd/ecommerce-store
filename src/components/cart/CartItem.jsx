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
    <div className="flex flex-col items-center gap-4 border-b border-gray-100 py-6 sm:flex-row sm:justify-between">
      {/* 1. Image & Title */}
      <div className="flex w-full items-center gap-4 sm:w-1/2">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* 2. Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <Minus size={14} weight="bold" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>

      {/* 3. Subtotal & Remove */}
      <div className="flex w-full items-center justify-between sm:w-auto sm:gap-6">
        <span className="font-bold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-red-500 hover:text-red-700"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
