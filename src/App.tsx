import React, { Suspense } from 'react';
import { 
  RouterProvider, 
  createBrowserRouter, 
  Outlet 
} from "react-router-dom";
import { 
  Box, 
  Spinner, 
  VStack 
} from "@chakra-ui/react";

// Lazy-loaded page components
const HomePage = React.lazy(() => import('./layouts/pages/HomePage'));
const ProductsPage = React.lazy(() => import('./layouts/pages/ProductDetailsPage'));
const ProductDetailPage = React.lazy(() => import('./layouts/pages/ProductDetailsPage'));
const CartPage = React.lazy(() => import('./layouts/pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./layouts/pages/CheckoutPage'));
const AuthPage = React.lazy(() => import('./layouts/pages/AuthPage'));
const ProfilePage = React.lazy(() => import('./layouts/pages/ProfilePage'));
const OrderHistoryPage = React.lazy(() => import('./layouts/pages/OrderHistoryPage'));


const ErrorPage = React.lazy(() => import('./layouts/pages/ErrorPage'));
import ProtectedRoute from "./features/PrivateRoute/ProtectedRoute";
import LoadingSpinner from './features/helpers/LoadingSpinner';
import RootLayout from './layouts/RootLayout';







function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'products',
          children: [
            {
              index: true,
              element: <ProductsPage />
            },
            {
              path: ':productId',
              element: <ProductDetailPage />
            }
          ]
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'checkout',
          element: (
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          )
        },
        {
          path: 'auth',
          element: <AuthPage />
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        },
        {
          path: 'orders',
          element: (
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          )
        },
        {
          path: '*',
          element: <ErrorPage />
        }
      ]
    }
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;