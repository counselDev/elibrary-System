import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user && user.role === "admin") {
    return children;
  } else if (user && user.role !== "admin") {
    return <Navigate to="/users" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtectedRoute;
