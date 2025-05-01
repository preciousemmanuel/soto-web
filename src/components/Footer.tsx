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
import { FaFacebookF, FaWhatsapp,FaInstagramSquare, FaTiktok } from "react-icons/fa";
import Logo from "../assets/soto.svg";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../layouts/hooks/useProduct";
// import { useAuth } from "../layouts/hooks/useAuth";

const Footer = () => {
  const navigate = useNavigate();
  const { categories, setSelectedCategoryId, refetchProductsByCategory } =
    useProduct();

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      setSelectedCategoryId(categoryId);
      await refetchProductsByCategory();
      navigate(`/category-list?category=${categoryId}`);
    } catch (error) {
      setSelectedCategoryId("");
    }
  };
  return (
    <Box bg="#FFF2ED" py={10} h="100%">
      <Flex
        px={12}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "start" }}
        mb={10}
        gap={{ base: 10, md: 20 }}
        position="relative"
      >
        {/* First Section: Logo and Subscription */}
        {/* <VStack spacing={4} align="start" w={{ base: "100%", md: "25%" }}>
          <Image src={Logo} alt="Logo" boxSize="80px" mb={4} />
          <Flex
            gap={2}
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "stretch" }}
            w={{ base: "100%", md: "auto" }}
          >
            <Input
              placeholder="Enter your email"
              bg="white"
              variant="unstyled"
              px={4}
              flex="1"
              w={{ base: "100%", md: "250px" }}
              rounded="full"
              overflow="hidden"
              mb={{ base: 2, md: 0 }}
              h="36px"
            />
            <Button
              bg={"#FF5733"}
              px={4}
              rounded="full"
              size="sm"
              color={"white"}
              fontSize={{ base: "12px", md: "14px" }}
              w={{ base: "100%", md: "auto" }}
              h="36px"
            >
              Subscribe
            </Button>
          </Flex>
        </VStack> */}
        <Box
          w="1px"
          position="absolute"
          top={-10}
          bottom={-10}
          left={450}
          bg="#FB9984"
          mx={4}
          display={{ base: "none", md: "block" }}
        />

        <Flex
          wrap="wrap"
          justify="space-between"
          w={{ base: "100%", md: "60%" }}
          gap={6}
        >
          {/* Example Link Group */}
          {[
            {
              title: "My Account",
              links: [
                { name: "My Account", href: "/profile" },
                { name: "Order History", href: "/my-orders" },
                { name: "Shopping Cart", href: "/cart" },
                { name: "Wishlist", href: "/wishlist" },
                { name: "Profile Settings", href: "/profile" },
              ],
            },
            {
              title: "Proxy",
              links: [
                { name: "About", href: "/about" },
                { name: "Shop", href: "/product-list" },
                { name: "Product", href: "/product-list" },
                { name: "Order", href: "/my-orders" },
                { name: "Customer Service", href: "/contact" },
              ],
            },
            {
              title: "Categories",
              links:
                Array.isArray(categories?.data?.data) &&
                categories?.data?.data
                  ?.slice(0, 5)
                  .map((category: any, index: any) => ({
                    name: category.name,
                    onClick: () => fetchProductsByCategory(category?._id),
                  })),
            },
            {
              title: "Helps",
              links: [
                { name: "Contact", href: "/contact" },
                { name: "FAQs", href: "#" },
                { name: "Support", href: "/contact" },
              ],
            },
          ].map((group, index) => (
            <VStack
              align="start"
              spacing={1}
              key={index}
              w={{ base: "50%", md: "25%" }}
            >
              <Text fontWeight="normal" mb={2} fontSize="lg">
                {group?.title}
              </Text>
              {Array.isArray(group?.links) &&
                group.links.map((link: any, i: any) => (
                  <Link
                    key={i}
                    color="gray.500"
                    fontSize="sm"
                    _hover={{ color: "orange.500" }}
                    href={link.href}
                    onClick={link.onClick}
                  >
                    {link.name}
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
          <Link href="https://www.facebook.com/SotoNigerianServices/" isExternal>
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
          </Link>
          
          <Link href="https://www.instagram.com/soto.ngofficial/" isExternal>
            <Icon
              as={FaInstagramSquare}
              boxSize={6}
              color="white"
              _hover={{ color: "pink.500" }}
              py={1}
              bg={"#FF5733"}
              rounded={"full"}
              cursor="pointer"
            />
          </Link>
          <Link href="https://wa.me/2348023255042" isExternal>
            <Icon
              as={FaWhatsapp}
              boxSize={6}
              color="white"
              _hover={{ color: "green.500" }}
              py={1}
              bg={"#FF5733"}
              rounded={"full"}
              cursor="pointer"
            />
          </Link>
          <Link href="https://www.tiktok.com/@sotonigeria" isExternal>
            <Icon
              as={FaTiktok}
              boxSize={6}
              color="white"
              _hover={{ color: "blue.400" }}
              py={1}
              bg={"#FF5733"}
              rounded={"full"}
              cursor="pointer"
            />
          </Link>
        </HStack>

        <Text fontSize="sm" color="gray.500" textAlign="center" pr={12}>
          Soto© {new Date().getFullYear()} All rights reserved
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
