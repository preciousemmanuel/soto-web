import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Link,
  Text,
  VStack,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
export default function VendorFooter() {
  return (
    <Box bg="#FFF2ED" py={10} h="100%">
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        borderTop="1px solid #FB9984"
        spacing={5}
        pt={6}
      >
        <HStack spacing={4} pl={12}>
          <Link
            fontSize="sm"
            href="/terms-condition"
            color="gray.500"
            _hover={{ color: "orange.500" }}
          >
            Terms & Conditions
          </Link>
          <Link
            fontSize="sm"
            href="/privacy-policy"
            color="gray.500"
            _hover={{ color: "orange.500" }}
          >
            Privacy Policy
          </Link>
        </HStack>

        <HStack spacing={4}>
          <Icon
            as={FaFacebookF}
            boxSize={6}
            color="white"
            _hover={{ color: "blue.600" }}
            py={1}
            bg={"#FF5733"}
            rounded={"full"}
            cursor="pointer"
          />
          <Icon
            as={FaTwitter}
            boxSize={6}
            color="white"
            _hover={{ color: "blue.400" }}
            py={1}
            bg={"#FF5733"}
            rounded={"full"}
            cursor="pointer"
          />
          <Icon
            as={FaLinkedinIn}
            boxSize={6}
            color="white"
            _hover={{ color: "blue.700" }}
            py={1}
            bg={"#FF5733"}
            rounded={"full"}
            cursor="pointer"
          />
        </HStack>

        <Text fontSize="sm" color="gray.500" textAlign="center" pr={12}>
          Soto© {new Date().getFullYear()} All rights reserved
        </Text>
      </Stack>
    </Box>
  );
}
