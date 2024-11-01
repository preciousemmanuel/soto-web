import {Box,Spinner} from "@chakra-ui/react"



const LoadingSpinner = () => {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <Spinner 
          size="xl"
          color="blue.500"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </Box>
    );
  };


  export default LoadingSpinner;