import { Box, Button, Grid, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const ProfileDetailsForm = () => { 
  // const { user, refetchProfile,loading } = useAuth();

  // useEffect(() => {
  //   refetchProfile();
  // }, []);

  // console.log(user,"")
  
  
  return (
  <Box p={12} bg="" borderRadius="lg" width={{ base: "100%", md: "100%" }} display="flex" flexDirection="column" alignItems="center">
    <Text color="#FF5733" fontWeight="bold" textAlign="left" fontSize={"17px"} mb={4} textDecoration="underline" fontFamily={"Poppins"}>
      Edit Profile
    </Text>
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
      {["Full Name", "Phone Number", "Email", "Password", "Shipping Address", "City"].map((label, index) => (
        <FormControl key={index}>
          <FormLabel>{label}</FormLabel>
          <Input borderRadius="md" rounded={"lg"}/>
        </FormControl>
      ))}
    </Grid>
    <Button bg="#FF5733" color={"white"} height={"65px"} width="45%" mt={8} rounded={"full"}>
      Save Changes
    </Button>
  </Box>
);
}

export default ProfileDetailsForm;
