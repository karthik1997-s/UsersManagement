import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { getToken } from "../utills/auth";

const AuthRoutes: React.FC = () => {
  const validUser: any = getToken();

  return validUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
