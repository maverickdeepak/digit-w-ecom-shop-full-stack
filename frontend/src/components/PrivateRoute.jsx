import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user_info } = useSelector((state) => state.auth);
  return user_info ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
