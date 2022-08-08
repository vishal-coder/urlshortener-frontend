import { Navigate, useLocation } from "react-router-dom";

import React, { useContext } from "react";

import { UserContext } from "../Context/UserContext.js";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  console.log("location in private", location);
  const { user } = useContext(UserContext);
  if (!user.auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  //replace state={{ from: location }}
  // authorized so return child components
  return children;
}
