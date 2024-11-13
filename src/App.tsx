import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Lazy-loaded page components
const HomePage = React.lazy(() => import("./layouts/pages/HomePage"));
const ProductsPage = React.lazy(
  () => import("./layouts/pages/ProductDetailsPage")
);
const ProductDetailPage = React.lazy(
  () => import("./layouts/pages/ProductDetailsPage")
);
const CartPage = React.lazy(() => import("./layouts/pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./layouts/pages/CheckoutPage"));
const AuthPage = React.lazy(() => import("./layouts/pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./layouts/pages/_main/ProfilePage"));
const OrderHistoryPage = React.lazy(
  () => import("./layouts/pages/OrderHistoryPage")
);
const Contact = React.lazy(() => import("./layouts/pages/ContactUs"));
const Wishlist = React.lazy(() => import("./layouts/pages/Wishlist"));
const CustomOrder = React.lazy(() => import("./layouts/pages/CustomOrder"));
const LoginPage = React.lazy(()=> import("./components/Login"))
const SignUpPage = React.lazy(()=> import("./components/SignUp"))
const ForgetPassword = React.lazy(()=> import("./components/ForgetPassword"))
const VendorOverview = React.lazy(()=> import("./layouts/pages/Vendor/VendorOverview"))
const VendorInsight = React.lazy(()=> import("./layouts/pages/Vendor/VendorInsight"))
const VendorWallet = React.lazy(()=> import("./layouts/pages/Vendor/VendorWallet"))
const VendorListOfTransactions = React.lazy(()=> import("./layouts/pages/Vendor/VendorListOfTransaction"))
const VendorWithdraw = React.lazy(()=> import("./layouts/pages/Vendor/VendorWithdraw"))
const VendorRequest = React.lazy(()=> import("./layouts/pages/Vendor/VendorRequest"))

const ErrorPage = React.lazy(() => import("./layouts/pages/ErrorPage"));
// import ProtectedRoute from "./features/PrivateRoute/ProtectedRoute";
import LoadingSpinner from "./features/helpers/LoadingSpinner";
import RootLayout from "./_layout/RootLayout";
import AuthLayout from "./_layout/AuthLayout";
import SellerLayout from "./_layout/SellerLayout";
import VendorOrder from "./layouts/pages/Vendor/VendorOrder";




const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          children: [
            {
              index: true,
              element: <ProductsPage />,
            },
            {
              path: ":productId",
              element: <ProductDetailPage />,
            },
          ],
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "checkout",
          element: (
            // <ProtectedRoute>
              <CheckoutPage />
            // </ProtectedRoute>
          ),
        },

        {
          path: "profile",
          element: (
            // <ProtectedRoute>
            <ProfilePage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "my-orders",
          element: (
            // <ProtectedRoute>
            <OrderHistoryPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "custom-order",
          element: <CustomOrder />,
        },
      ],
    },
    {
      path: "/", // Pages without Navbar and Footer
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "auth", element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
    {
      path: "/", // Seller-specific pages
      element: <SellerLayout />, //  Seller layout for these routes
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <VendorOverview /> },
        { path: "vendor-orders", element: <VendorOrder /> },
        { path: "vendor-wallet", element: <VendorWallet /> },
        { path: "vendor-insight", element: <VendorInsight /> },
        { path: "vendor-overview", element: <VendorOverview /> },
        { path: "vendor-transcactions", element: <VendorListOfTransactions /> },
        { path: "vendor-request", element: <VendorRequest /> },
        { path: "vendor-withdraw", element: <VendorWithdraw /> },
        { path: "seller", element: <VendorOverview /> },
        // Add other seller-specific routes here
      ],
    },
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
