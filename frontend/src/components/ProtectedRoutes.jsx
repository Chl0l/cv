import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ProtectedRoutes() {
  const { loggedInUser } = useUser();

  if (!loggedInUser.firstname) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
