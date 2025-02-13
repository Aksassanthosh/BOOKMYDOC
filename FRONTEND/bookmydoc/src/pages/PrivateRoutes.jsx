import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ requiredRole }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");
  

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a role is required and the user's role doesn't match, redirect to Unauthorized page
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // Render child routes if authenticated and authorized
};

export default PrivateRoutes;
