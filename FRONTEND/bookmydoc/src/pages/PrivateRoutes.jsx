import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ requiredRole }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");
  

  
  if (!token) {
    return <Navigate to="/login" />;
  }

  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
