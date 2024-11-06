
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../features/helpers/LoadingSpinner";
import IdleTimer from "../features/helpers/IdleTimer";

const AuthLayout = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <IdleTimer timeout={120000} />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default AuthLayout;
