import { Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  const navigate = useNavigate();

  return (
    <VStack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      
      px={4}
    >
      {/* <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxW7m4zr5dM7LYYEOELe6IT16UquPCgvI_DPjiBcqYSzvKPK1qm3kf56PnyXEcGxGsM6o&usqp=CAU"
        alt="Not found character"
        boxSize="100px"
      /> */}
      <Heading  size="xl" textAlign="center" fontFamily={"Poppins"} color={"red.400"}>
        Oops! Page Not Found
      </Heading>
      <Text color="gray.600" fontSize="md" textAlign="center" maxW="400px">
        {error?.statusText ||
          error?.message ||
          "The page you’re looking for doesn’t exist. Let's get you back on track!"}
      </Text>
      <Button bg="black" color={"white"} size="md" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </VStack>
  );
};

export default ErrorPage;
