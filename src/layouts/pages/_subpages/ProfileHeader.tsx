import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = () => {
  const { switchToVendor } = useAuth();
  


  return (
    <Flex justify="space-between" align="center" p={4} mb={6} bg="#FFEFEB">
      <Heading size="lg" fontFamily={"Poppins"} color={"#FF5733"}>
        Profile
      </Heading>
      <Button
        size="lg"
        bg="black"
        color={"white"}
        borderRadius="full"
        onClick={switchToVendor}
      >
        Switch to Seller
      </Button>
    </Flex>
  );
};

export default ProfileHeader;
