import { Button, Flex, Heading } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = () => {
  const {
    switchToVendor,
    switchToUser,
    isAuthenticated,
    isVendorAuthenticated,
  } = useAuth();

  return (
    <Flex
      justify="space-between"
      align="center"
      p={{ base: 4, md: 6, lg: 8 }}
      mb={{ base: 4, md: 5, lg: 6 }}
      bg="#FFEFEB"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 0 }}
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        fontFamily="Poppins"
        color="#FF5733"
        mb={{ base: 2, md: 0 }}
      >
        Profile
      </Heading>
      <Flex
        gap={{ base: 2, md: 4 }}
        flexDirection={{ base: "column", sm: "row" }}
        w={{ base: "100%", sm: "auto" }}
      >
        {isVendorAuthenticated && (
          <Button
            size={{ base: "md", md: "lg" }}
            bg="black"
            color="white"
            borderRadius="full"
            onClick={switchToUser}
            w={{ base: "100%", sm: "auto" }}
          >
            Switch to Buyer
          </Button>
        )}
        {isAuthenticated && (
          <Button
            size={{ base: "md", md: "lg" }}
            bg="black"
            color="white"
            borderRadius="full"
            onClick={switchToVendor}
            w={{ base: "100%", sm: "auto" }}
          >
            Switch to Vendor
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileHeader;
