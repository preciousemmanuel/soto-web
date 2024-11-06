import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import LoadingSpinner from "../features/helpers/LoadingSpinner";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IdleTimer from "../features/helpers/IdleTimer";



const RootLayout = () => {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <IdleTimer timeout={120000} />
        <Navbar/>
        <Box as="main" flex={1}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </Box>
       <Footer />
      </Box>
    );
  };


  export default RootLayout;
  