import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../layouts/hooks/useAuth";

interface VendorProtectedRouteProps {
  children: React.ReactNode;
}

const VendorProtectedRoute: React.FC<VendorProtectedRouteProps> = ({ children }) => {
  const { isVendorAuthenticated } = useAuth();
  const location = useLocation();

  if (!isVendorAuthenticated) {
    return <Navigate to="/auth/vendor-login" state={{ from: location }} replace />;
  }

  return children;
};

export default VendorProtectedRoute;