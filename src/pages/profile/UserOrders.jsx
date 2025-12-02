import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../../api/dummyProductsApi";
import { Package, Truck, CheckCircle, Clock } from "phosphor-react"; // Added Clock icon
import Skeleton from "../../components/shared/Skeleton";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);

  // 1. Fetch API Data (The fake history from DummyJSON)
  const { data: apiData, isLoading } = useGetUserOrdersQuery(user?.id);

  // 2. State to hold combined orders
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    // Load local orders (The ones you just placed)
    const localOrders = JSON.parse(localStorage.getItem("my_orders") || "[]");

    // Filter local orders to only show current user's orders
    const userLocalOrders = localOrders.filter((o) => o.userId === user?.id);

    // Get API carts (if any)
    const apiOrders = apiData?.carts || [];

    // Combine them: Local orders first (newest), then API orders
    setAllOrders([...userLocalOrders, ...apiOrders]);
  }, [apiData, user?.id]);

  if (isLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );

  // Show empty state only if BOTH sources are empty
  if (!isLoading && allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <Package size={48} className="mb-4 text-gray-300" />
        <p className="text-lg font-medium">No past orders found.</p>
        <p className="text-sm">Looks like you haven't bought anything yet!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Order History</h2>

      {allOrders.map((order, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          {/* Order Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-bold text-gray-800">#{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">
                {/* Handle different date formats (API uses simple numbers sometimes, we use ISO) */}
                {order.date
                  ? new Date(order.date).toLocaleDateString()
                  : "Historical Data"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold text-primary">${order.total}</p>
            </div>
            <div>
              {/* Status Logic */}
              {order.status === "Processing" ? (
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                  <Clock size={14} /> Processing
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  <CheckCircle size={14} /> Delivered
                </span>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            {order.products.map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Handle Image: Local orders have 'thumbnail', API might not */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100 text-gray-400">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Package size={20} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {/* Handle Price calculation differences */}$
                  {product.total ||
                    (product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
