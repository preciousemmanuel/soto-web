import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Flex,
  Text,
  Button,
  Icon,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import {
  FaCheckCircle,
  FaEnvelope,
  FaPowerOff,
  FaAngleRight,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";

const ProfileInfoBox = ({ onSelectOption }: any) => {
  const { user, refetchProfile, logout, loading } = useAuth();
  const toast = useToast();

  // console.log(user,"Details.........")

  useEffect(() => {
    refetchProfile();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <LoadingSpinner/>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Box p={6} textAlign="center">
        <Text>No profile data available.</Text>
      </Box>
    );
  }

  // Render Profile Data
  return (
    <Box
      p={6}
      bg="#FFEFEB"
      borderRadius="lg"
      mb={6}
      width={{ base: "100%", md: "45%" }}
    >
      <Flex align="center" mb={4}>
        <Avatar size="md" name={`${user.FirstName} ${user.LastName}`} />
        <Box ml={4}>
          <Text fontWeight="bold">{`${user.FirstName}`}</Text>
          <Text color="gray.500" fontSize={"sm"}>
            {user.Email}
          </Text>
          <Button
            size="xs"
            colorScheme="green"
            mt={2}
            leftIcon={<FaCheckCircle />}
          >
            Verified
          </Button>
        </Box>
        <Icon
          as={CiEdit}
          boxSize={8}
          ml="auto"
          cursor="pointer"
          color={"#FF5733"}
        />
      </Flex>
      <Box>
        {["Help Center", "Feedback", "Logout"].map((item, index) => (
          <Flex
            key={index}
            px={8}
            align="center"
            p={3}
            bg={index === 0 ? "" : "transparent"}
            cursor="pointer"
            borderRadius="md"
            onClick={() => {
              if (item === "Logout") {
                logout();
                toast({
                  title: "Logged out",
                  description: "You have been successfully logged out.",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
              } else {
                onSelectOption(item);
              }
            }}
          >
            <Icon
              color={"#FF5733"}
              fontWeight={"700"}
              as={item === "Logout" ? FaPowerOff : FaEnvelope}
              mr={4}
            />
            <Text flex="1">{item}</Text>
            <Icon as={FaAngleRight} />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileInfoBox;
