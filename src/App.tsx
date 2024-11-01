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

// Spinner Component
const GlobalSpinner = () => (
  <VStack 
    height="100vh" 
    justifyContent="center" 
    alignItems="center"
  >
    <Spinner
      thickness ="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </VStack>
);

// Root Layout Component
const RootLayout = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Optional: Add Header/Navigation here */}
      <Box as="main" flex={1}>
        <Suspense fallback={<GlobalSpinner />}>
          <Outlet />
        </Suspense>
      </Box>
      {/* Add Footer here */}
    </Box>
  );
};

import ProtectedRoute from "./features/PrivateRoute/ProtectedRoute";

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
    <Suspense fallback={<GlobalSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;