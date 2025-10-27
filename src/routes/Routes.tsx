import { lazy } from "react";
import type { ReactNode } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import UnAuthRoutes from "./UnAuthRoutes";
import AuthRoutes from "./AuthRoutes";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";

const Login = Loadable(lazy(() => import("../pages/login")));
const Users = Loadable(lazy(() => import("../pages/user")));
const routes: RouteObject[] = [
  {
    path: "",
    element: <UnAuthRoutes />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/users" />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/page/404" />,
  },
];

export default function Routes(): ReactNode {
  return useRoutes(routes);
}
