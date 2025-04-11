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
        <LoadingSpinner />
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
      p={{ base: 4, md: 6 }}
      bg="#FFEFEB"
      borderRadius="lg"
      mb={{ base: 4, md: 6 }}
      width={{ base: "100%", md: "45%" }}
    >
      <Flex align="center" mb={{ base: 3, md: 4 }}>
        <Avatar
          size={{ base: "sm", md: "md" }}
          name={`${user.FirstName} ${user.LastName}`}
        />
        <Box ml={{ base: 3, md: 4 }}>
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
          >{`${user.FirstName}`}</Text>
          <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
            {user.Email}
          </Text>
          <Button
            size={{ base: "xs", sm: "sm" }}
            colorScheme="green"
            mt={{ base: 1, md: 2 }}
            leftIcon={<FaCheckCircle />}
            fontSize={{ base: "xs", md: "sm" }}
          >
            Verified
          </Button>
        </Box>
        <Icon
          as={CiEdit}
          boxSize={{ base: 6, md: 8 }}
          ml="auto"
          cursor="pointer"
          color={"#FF5733"}
        />
      </Flex>
      <Box>
        {["Help Center", "Feedback", "Logout"].map((item, index) => (
          <Flex
            key={index}
            px={{ base: 4, md: 8 }}
            align="center"
            p={{ base: 2, md: 3 }}
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
              mr={{ base: 2, md: 4 }}
              boxSize={{ base: 4, md: 5 }}
            />
            <Text flex="1" fontSize={{ base: "sm", md: "md" }}>
              {item}
            </Text>
            <Icon as={FaAngleRight} boxSize={{ base: 4, md: 5 }} />
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileInfoBox;
