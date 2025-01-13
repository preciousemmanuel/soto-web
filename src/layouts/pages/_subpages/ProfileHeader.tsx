import { Button, Flex, Heading } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = () => {
  const { switchToVendor,switchToUser, isAuthenticated,isVendorAuthenticated } = useAuth();
  


  return (
    <Flex justify="space-between" align="center" p={8}  mb={6} bg="#FFEFEB">
      <Heading size="lg" fontFamily={"Poppins"} color={"#FF5733"}>
        Profile
      </Heading>
     {isVendorAuthenticated && <Button
        size="lg"
        bg="black"
        color={"white"}
        borderRadius="full"
        onClick={switchToUser}
      >
        Switch to Buyer
      </Button>}
     {isAuthenticated && <Button
        size="lg"
        bg="black"
        color={"white"}
        borderRadius="full"
        onClick={switchToVendor}
      >
        Switch to Seller
      </Button>}
    </Flex>
  );
};

export default ProfileHeader;
