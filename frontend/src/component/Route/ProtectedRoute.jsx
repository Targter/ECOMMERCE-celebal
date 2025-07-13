

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    console.log("User is not an admin, redirecting to /account");
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
