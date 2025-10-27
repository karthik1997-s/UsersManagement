import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { getToken } from "../utills/auth";

const UnAuthRoutes: React.FC = () => {
  const validUser: any = getToken();

  return validUser ? <Navigate to="/" /> : <Outlet />;
};

export default UnAuthRoutes;
