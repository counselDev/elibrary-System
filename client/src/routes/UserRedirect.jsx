import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const UserRedirect = ({ children }) => {
  const { user } = useAppContext();
  if (user && user.role === "admin") {
    return <Navigate to="/admin" />;
  } else if (user && user.role === "reader") {
    return <Navigate to="/users" />;
  } else {
    return children;
  }
};

export default UserRedirect;
