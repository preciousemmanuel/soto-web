import React, { useEffect, useState } from "react";
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
import apiClient from "../../../services/axios";
import { useAuth } from "../../hooks/useAuth";

const ProfileInfoBox = ({ onSelectOption }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const toast = useToast();

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/user/profile");
      if (response.status === 200) {
        const { FirstName, LastName, Email } = response.data.data;
        setProfile({ FirstName, LastName, Email });

        toast({
          title: "Profile Loaded Successfully",
          description: `Welcome, ${FirstName}!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to Load Profile",
        description: "Unable to fetch profile data. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profile data on component mount
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!profile) {
    return <Text>No profile data available.</Text>;
  }

  return (
    <Box
      p={6}
      bg="#FFEFEB"
      borderRadius="lg"
      mb={6}
      width={{ base: "100%", md: "45%" }}
    >
      <Flex align="center" mb={4}>
        <Avatar size="md" name={`${profile.FirstName} ${profile.LastName}`} />
        <Box ml={4}>
          <Text fontWeight="bold">{`${profile.FirstName} ${profile.LastName}`}</Text>
          <Text color="gray.500" fontSize={"sm"}>
            {profile.Email}
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
                // Handle logout logic here if needed
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
