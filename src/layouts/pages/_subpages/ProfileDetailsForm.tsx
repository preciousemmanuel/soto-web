import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const ProfileDetailsForm = () => { return (
  <Box p={12} bg="" borderRadius="lg" width={{ base: "100%", md: "45%" }}>
    <Text color="#FF5733" fontWeight="bold" fontSize={"17px"} mb={4} textDecoration="underline" fontFamily={"Poppins"}>
      Edit Profile
    </Text>
    {["Full Name", "Phone Number", "Email", "Password", "Shipping Address", "City"].map((label, index) => (
      <FormControl key={index} mb={4}>
        <FormLabel>{label}</FormLabel>
        <Input borderRadius="md" rounded={"lg"}/>
      </FormControl>
    ))}
    <Button bg="#FF5733" color={"white"} height={"65px"} width="70%" mt={4} rounded={"full"}>
      Save Changes
    </Button>
  </Box>
);
}

export default ProfileDetailsForm;
