import React from "react";
import { Navigate } from "react-router-dom";

const AdvancedRoute = ({ element, ...rest }) => {
  const heldRole = localStorage.getItem("role");

  // If the role is not allowed, redirect to the home page
  if (!heldRole || heldRole === "Student" || heldRole === "Other") {
    return <Navigate to="/" />;
  }

  // Render the element if the role is valid
  return element;
};

export default AdvancedRoute;
