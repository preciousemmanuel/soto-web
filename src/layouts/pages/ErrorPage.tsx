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
      spacing={{ base: 4, md: 6 }}
      px={{ base: 2, sm: 4, md: 6, lg: 8 }}
    >
      {/* <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxW7m4zr5dM7LYYEOELe6IT16UquPCgvI_DPjiBcqYSzvKPK1qm3kf56PnyXEcGxGsM6o&usqp=CAU"
        alt="Not found character"
        boxSize={{ base: "80px", md: "100px" }}
      /> */}
      <Heading
        size={{ base: "lg", sm: "xl", md: "2xl" }}
        textAlign="center"
        fontFamily="Poppins"
        color="red.400"
        px={{ base: 2, sm: 4 }}
      >
        Oops! Page Not Found
      </Heading>
      <Text
        color="gray.600"
        fontSize={{ base: "sm", sm: "md", md: "lg" }}
        textAlign="center"
        maxW={{ base: "300px", sm: "350px", md: "400px" }}
        px={{ base: 2, sm: 4 }}
      >
        {error?.statusText ||
          error?.message ||
          "The page you're looking for doesn't exist. Let's get you back on track!"}
      </Text>
      <Button
        bg="black"
        color="white"
        size={{ base: "sm", sm: "md" }}
        onClick={() => {
          if (window.history.length > 2) {
            navigate(-1);
          }
        }}
        mt={{ base: 2, sm: 4 }}
        px={{ base: 6, sm: 8 }}
        py={{ base: 2, sm: 3 }}
      >
        Back
      </Button>
    </VStack>
  );
};

export default ErrorPage;
