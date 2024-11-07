import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const navigate = useNavigate();
  function handleNavigate(): void {
    navigate("/seller");
  }

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
        onClick={handleNavigate}
      >
        Switch to Seller
      </Button>
    </Flex>
  );
};

export default ProfileHeader;
