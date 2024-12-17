import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

// Lazy-loaded page components
const HomePage = React.lazy(() => import("./layouts/pages/HomePage"));
const ProductsPage = React.lazy(() => import("./layouts/pages/ProductPage"));
const ProductDetailPage = React.lazy(
  () => import("./layouts/pages/ProductDetailsPage")
);
const CartPage = React.lazy(() => import("./layouts/pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./layouts/pages/CheckoutPage"));
// const AuthPage = React.lazy(() => import("./layouts/pages/AuthPage"));
const ProfilePage = React.lazy(
  () => import("./layouts/pages/_main/ProfilePage")
);
const OrderHistoryPage = React.lazy(
  () => import("./layouts/pages/OrderHistoryPage")
);
const Contact = React.lazy(() => import("./layouts/pages/ContactUs"));
const Wishlist = React.lazy(() => import("./layouts/pages/Wishlist"));
const CustomOrder = React.lazy(() => import("./layouts/pages/CustomOrder"));
const LoginPage = React.lazy(() => import("./components/Login"));
const SignUpPage = React.lazy(() => import("./components/SignUp"));
const ForgetPassword = React.lazy(() => import("./components/ForgetPassword"));
const VendorOverview = React.lazy(
  () => import("./layouts/pages/Vendor/VendorOverview")
);
const VendorInsight = React.lazy(
  () => import("./layouts/pages/Vendor/VendorInsight")
);
const VendorWallet = React.lazy(
  () => import("./layouts/pages/Vendor/VendorWallet")
);
const VendorListOfTransactions = React.lazy(
  () => import("./layouts/pages/Vendor/VendorListOfTransaction")
);
const VendorWithdraw = React.lazy(
  () => import("./layouts/pages/Vendor/VendorWithdraw")
);
const VendorRequest = React.lazy(
  () => import("./layouts/pages/Vendor/VendorRequest")
);
const VendorSignup = React.lazy(() => import("./components/VendorSignup"));
const VendorLogin = React.lazy(() => import("./components/VendorLogin"));
const AddProduct = React.lazy(
  () => import("./layouts/pages/product/addProduct")
);

const ErrorPage = React.lazy(() => import("./layouts/pages/ErrorPage"));
import ProtectedRoute from "./features/PrivateRoute/ProtectedRoute";
import LoadingSpinner from "./features/helpers/LoadingSpinner";
import RootLayout from "./_layout/RootLayout";
import AuthLayout from "./_layout/AuthLayout";
import SellerLayout from "./_layout/SellerLayout";
import VendorOrder from "./layouts/pages/Vendor/VendorOrder";
import "react-toastify/dist/ReactToastify.css";
import VendorProtectedRoute from "./features/PrivateRoute/VendorProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuccessMessage from "./layouts/pages/product/alertPage";
import VendorProductList from "./layouts/pages/Vendor/VendorProductList";
import ShippingAddress from "./layouts/pages/ShippingAddress";
import PaymentMessage from "./layouts/pages/product/paymentAlert";
import OrderDetailPage from "./layouts/pages/OrderDetailPage";
import CategoryProductPage from "./layouts/pages/CategoryProductPage";
import ReviewOrder from "./layouts/pages/ReviewOrder";
import WithdrawalSuccessMessage from "./layouts/pages/product/withdrawalSuccess";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import SearchResult from "./layouts/pages/SearchResult";
import ResetPassword from "./components/ResetPassword";
import OtpVerification from "./components/OtpPage";
import VendorProductDetailsPage from "./layouts/pages/Vendor/VendorProductDetails";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <HomePage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "products",
          children: [
            {
              // index: true,
              element: (
                
                <ProductsPage />
                
              ),
            },
            {
              path: ":productId",
              element: (
                <ProductDetailPage />
              ),
            },
          ],
        },
        {
          path: "product-list",
          element: (
            <ProductsPage />
          ),
        },
        {
          path: "category-list",
          element: (
            <CategoryProductPage />
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "terms-condition",
          element: <Terms />,
        },
        {
          path: "privacy-policy",
          element: <Privacy />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-orders",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              ),
            },
            {
              path: ":orderId",
              element: (
                <ProtectedRoute>
                <OrderDetailPage />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "custom-order",
          element: <CustomOrder />,
        },
        {
          path: "search-results",
          element: <SearchResult />,
        },
        {
          path: "review-order",
          element: <ReviewOrder />,
        },
        {
          path: "track-order",
          element: <OrderDetailPage />,
        },
        {
          path: "withdrawal-success",
          element: <WithdrawalSuccessMessage/>
        }
      ],
    },
    {
      path: "/auth", // Pages without Navbar and Footer
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
        {
          path: "shipping-address",
          element: <ShippingAddress />,
        },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "otp-page", element: <OtpVerification /> },
        { path: "vendor-signup", element: <VendorSignup /> },
        { path: "vendor-login", element: <VendorLogin /> },
        { path: "*", element: <ErrorPage /> },
        
      ],
    },

    {
      path: "/", // Seller-specific pages
      element: <SellerLayout />, //  Seller layout for these routes
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <VendorProtectedRoute>
              <VendorOverview />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-product/:productId",
          element: (
            <VendorProductDetailsPage />
          ),
        },
        {
          path: "vendor-orders",
          element: (
            <VendorProtectedRoute>
              <VendorOrder />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-orders",
          children: [
            {
              index: true,
              element: (
                <VendorProtectedRoute>
                  <VendorOrder />
                </VendorProtectedRoute>
              ),
            },
            {
              path: ":orderId",
              element: (
                <VendorProtectedRoute>
                <OrderDetailPage />
                </VendorProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "vendor-wallet",
          element: (
            <VendorProtectedRoute>
              {" "}
              <VendorWallet />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-insight",
          element: (
            <VendorProtectedRoute>
              {" "}
              <VendorInsight />{" "}
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-overview",
          element: (
            <VendorProtectedRoute>
              <VendorOverview />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-transcactions",
          element: (
            <VendorProtectedRoute>
              <VendorListOfTransactions />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-request",
          element: (
            <VendorProtectedRoute>
              <VendorRequest />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-withdraw",
          element: (
            <VendorProtectedRoute>
              <VendorWithdraw />
            </VendorProtectedRoute>
          ),
        },
        // { path: "seller", element: <VendorOverview /> },
        {
          path: "vendor-profile",
          element: (
            <VendorProtectedRoute>
              <ProfilePage />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "add-product",
          element: (
            <VendorProtectedRoute>
              <AddProduct />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "vendor-product-list",
          element: (
            <VendorProtectedRoute>
              <VendorProductList />
            </VendorProtectedRoute>
          ),
        },
        {
          path: "alert-success",
          element: <SuccessMessage />,
        },
        {
          path: "payment-success",
          element: <PaymentMessage />,
        },

        // Add other seller-specific routes here
      ],
    },
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
