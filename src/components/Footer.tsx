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
import Logo from "../assets/soto.png";

const Footer = () => {
  return (
    <Box bg="#FFF2ED" py={10} px={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "start" }}
        mb={10}
        gap={{ base: 10, md: 20 }}
      >
        {/* First Section: Logo and Subscription */}
        <VStack spacing={4} align="start" w={{ base: "100%", md: "25%" }}>
          <Image src={Logo} alt="Logo" boxSize="50px" mb={4} />
          <Flex
            as="form"
            w="100%"
            bg="white"
            rounded="full"
            overflow="hidden"
            boxShadow="md"
          >
            <Input
              placeholder="Enter your email"
              bg="white"
              variant="unstyled"
              px={4}
              flex="1"
            />
            <Button
              bg={"#FF5733"}
              px={4}
              rounded="full"
              size={"lg"}
              color={"white"}
              fontSize={"14px"}
            >
              Subscribe
            </Button>
          </Flex>
        </VStack>

        {/* Second Section: Links */}
        <Flex
          wrap="wrap"
          justify="space-between"
          w={{ base: "100%", md: "60%" }}
          gap={8}
        >
          {/* Example Link Group */}
          {[
            {
              title: "My Account",
              links: [
                "My Account",
                "Order History",
                "Shopping Cart",
                "Wishlist",
              ],
            },
            {
              title: "Proxy",
              links: ["About", "Shop", "Product", "Track Order"],
            },
            {
              title: "Categories",
              links: ["Grocries", "Furniture", "Fashion", "Kitchen utensils"],
            },
            { title: "Helps", links: ["Contact", "Faqs"] },
          ].map((group, index) => (
            <VStack
              align="start"
              spacing={1}
              key={index}
              w={{ base: "50%", md: "25%" }}
            >
              <Text fontWeight="normal" mb={2} fontSize="lg">
                {group.title}
              </Text>
              {group.links.map((link, i) => (
                <Link
                  key={i}
                  color="gray.500"
                  fontSize="sm"
                  _hover={{ color: "orange.500" }}
                >
                  {link}
                </Link>
              ))}
            </VStack>
          ))}
        </Flex>
      </Flex>

      {/* Bottom Section: Terms, Social Media, Copyright */}
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        borderTop="1px solid #e0e0e0"
        pt={5}
        spacing={5}
      >
        <HStack spacing={4}>
          <Link fontSize="sm" color="gray.500" _hover={{ color: "orange.500" }}>
            Terms & Conditions
          </Link>
          <Link fontSize="sm" color="gray.500" _hover={{ color: "orange.500" }}>
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

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Soto© 2024 All rights reserved
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
