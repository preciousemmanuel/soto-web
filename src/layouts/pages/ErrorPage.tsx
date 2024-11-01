
import { 
  Heading, 
  Text, 
  Button, 
  VStack 
} from '@chakra-ui/react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string, message?: string };
  const navigate = useNavigate();

  return (
    <VStack 
      height="100vh" 
      justifyContent="center" 
      alignItems="center" 
      spacing={6}
      bg="red.50"
    >
      <Heading color="red.600" size="2xl">
        Oops! Something went wrong
      </Heading>
      <Text color="gray.700" textAlign="center">
        {error?.statusText || error?.message || "An unexpected error occurred"}
      </Text>
      <Button 
        colorScheme="red" 
        onClick={() => navigate('/')}
      >
        Return to Home
      </Button>
    </VStack>
  );
};

export default ErrorPage;