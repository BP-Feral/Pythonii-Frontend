import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  // Check if user is logged in (e.g., check for a token in localStorage)
  const isAuthenticated = localStorage.getItem("access_token");

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the requested component
  return element;
};

export default PrivateRoute;
