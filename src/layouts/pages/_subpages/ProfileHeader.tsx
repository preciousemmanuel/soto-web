import { Button, Flex, Heading } from "@chakra-ui/react";

const ProfileHeader = () => {
  return (
    <Flex justify="space-between" align="center" p={4} mb={6} bg="#FFEFEB">
      <Heading size="lg" fontFamily={"Poppins"} color={"#FF5733"}>Profile</Heading>
      <Button size="lg" bg="black" color={"white"} borderRadius="full">
        Switch to Seller
      </Button>
    </Flex>
  );
};

export default ProfileHeader;
