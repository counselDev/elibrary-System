import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const UserProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user && user.role === "reader") {
    return children;
  } else if (user && user.role === "admin") {
    <Navigate to="/admin" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
