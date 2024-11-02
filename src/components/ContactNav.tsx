
import { Box, Text, HStack, Icon, Spacer } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";

const ContactNav = () => {
  return (
    <Box bg="#FFF2ED" py={2} px={4}>
      <HStack align="center">
        <Text color="#FF5733" fontWeight="bold">
          Contact us
        </Text>

        <HStack color="gray.500">
          <Icon as={MdLocationOn} />
          <Text>Location</Text>
        </HStack>

        <HStack color="gray.500">
          <Icon as={FaGlobe} />
          <Text>ENG</Text>
        </HStack>

        <Spacer />

        <Text color="gray.500">Buy & sell on Soto</Text>
      </HStack>
    </Box>
  );
};

export default ContactNav;
