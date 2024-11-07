// import SellerNavbar from "../components/SellerNavbar";
// import SellerFooter from "../components/SellerFooter";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer";
import { Suspense } from "react";
import LoadingSpinner from "../features/helpers/LoadingSpinner";
// import Navbar from "../components/Navbar";
import SellerNavbar from "../components/SellerNavbar";

const SellerLayout = () => (
  <Box>
    <SellerNavbar />
    <Box>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </Box>
    <Footer />
  </Box>
);

export default SellerLayout;
