import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    // If user is logged in but NOT an admin
    toast.error("Access Denied: Admins only.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
