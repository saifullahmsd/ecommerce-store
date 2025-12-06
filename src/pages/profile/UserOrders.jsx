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
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Order History
      </h2>

      {allOrders.map((order, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800 dark:border-slate-700"
        >
          {/* Order Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 dark:border-slate-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order ID
              </p>
              <p className="font-bold text-gray-800 dark:text-white">
                #{order.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {order.date
                  ? new Date(order.date).toLocaleDateString()
                  : "Historical Data"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Amount
              </p>
              <p className="font-bold text-primary">${order.total}</p>
            </div>
            <div>
              {order.status === "Processing" ? (
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  <Clock size={14} /> Processing
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
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
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-gray-500">
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
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1 dark:text-gray-200">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  $
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
