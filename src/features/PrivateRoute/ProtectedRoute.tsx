// src/features/PrivateRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../layouts/hooks/useAuth";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
   // Debug log

  // If not authenticated and trying to access a protected route
  if (!isAuthenticated) {
    // Redirect to auth page while saving the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated and on auth page, redirect to home
  if (isAuthenticated && location.pathname === '/auth') {
    return <Navigate to="/" replace />;
  }

  // If authenticated and accessing a protected route, show the route
  return children;
}

export default ProtectedRoute;
