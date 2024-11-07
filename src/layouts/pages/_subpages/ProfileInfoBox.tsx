import { Box, Avatar, Flex, Text, Button, Icon } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";

import { FaCheckCircle, FaEnvelope, FaPowerOff,FaAngleRight } from "react-icons/fa";

const ProfileInfoBox = ({ onSelectOption }) => { return (
  <Box p={6} bg="#FFEFEB" borderRadius="lg" mb={6} width={{ base: "100%", md: "45%" }}>
    <Flex align="center" mb={4}>
      <Avatar size="md" name="John Doe" />
      <Box ml={4}>
        <Text fontWeight="bold">John Doe</Text>
        <Text color="gray.500" fontSize={"sm"}>john.doe@example.com</Text>
        <Button size="xs" colorScheme="green" mt={2} leftIcon={<FaCheckCircle />}>
          Verified
        </Button>
      </Box>
      <Icon as={CiEdit} boxSize={8} ml="auto" cursor="pointer" color={"#FF5733"} />
    </Flex>
    <Box>
      {["Help Center", "Feedback", "Logout"].map((item, index) => (
        <Flex key={index} px={8} align="center" p={3} bg={index === 0 ? "" : "transparent"} cursor="pointer" borderRadius="md" onClick={() => onSelectOption(item)}>
          <Icon color={"#FF5733"} fontWeight={"700"} as={item === "Logout" ? FaPowerOff : FaEnvelope} mr={4} />
          <Text flex="1">{item}</Text>
          <Icon as={FaAngleRight} />
        </Flex>
      ))}
    </Box>
  </Box>
);
}

export default ProfileInfoBox;
