import {
  Box,
  Flex,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import Logo from "../assets/soto.png";
import { IoCartOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Search2Icon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import AccountModal from "../features/modals/AccountModal";
import CategoriesPopover from "../features/modals/CategoriesPopover";
import { CartItem } from "../layouts/pages/_subpages/CategoriesSection";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    updateCartQuantity();

    window.addEventListener("storage", updateCartQuantity);

    window.addEventListener("cartUpdated", updateCartQuantity);

    return () => {
      window.removeEventListener("storage", updateCartQuantity);
      window.removeEventListener("cartUpdated", updateCartQuantity);
    };
  }, []);

  const updateCartQuantity = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const quantity = cartItems.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
    setCartQuantity(quantity);
  };

  return (
    <Box bg="#FFF2ED" position={"fixed"} width={"100%"} zIndex={"1000"}>
      {/* Top bar with contact link, location, and language */}
      <Flex
        py={2}
        px={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        fontSize={{ base: "12px", md: "14px" }}
      >
        <Link to="/contact">
          <Text color="#FF5733" fontWeight="bold" as="u">
            Contact us
          </Text>
        </Link>

        <Flex alignItems="center" gap={{ base: 4, md: 8 }}>
          <Flex gap={2} alignItems="center">
            <CiLocationOn color="gray" />
            <Text color="gray.500">Location</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <TbWorld color="gray" />
            <Text color="gray.500">ENG</Text>
          </Flex>
          <Text color="gray.500">Buy & sell on Soto</Text>
        </Flex>
      </Flex>

      {/* Main navigation bar */}
      <Flex
        py={4}
        px={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        bg={"white"}
      >
        {/* Logo */}
        <Box>
          <Image src={Logo} width={{ base: "40px", md: "50px" }} />
        </Box>

        {/* Hamburger Icon for Mobile */}
        <Box display={{ base: "block", md: "none" }}>
          <Button onClick={onDrawerOpen} variant="ghost">
            <HamburgerIcon w={6} h={6} color="gray.600" />
          </Button>
        </Box>

        {/* Navigation links for larger screens */}
        <Flex
          display={{ base: "none", md: "flex" }}
          gap={6}
          alignItems="center"
        >
          <Link to="/">
            <Text color="gray.500" _hover={{ color: "#FF5733" }}>
              Home
            </Text>
          </Link>
          <CategoriesPopover />
          <Link to="/custom-order">
            <Text color="gray.500" _hover={{ color: "#FF5733" }}>
              Custom Order
            </Text>
          </Link>
          <Link to="/my-orders">
            <Text color="gray.500" _hover={{ color: "#FF5733" }}>
              My Orders
            </Text>
          </Link>
        </Flex>

        {/* Search, Cart, and Account Icons */}
        <Flex
          gap={{ base: 4, md: 8 }}
          alignItems="center"
          mt={{ base: 4, md: 0 }}
          display={{ base: "none", md: "flex" }}
        >
          <Box maxW="200px" width="100%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Search2Icon} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Enter your list"
                onClick={handleExpand}
                onBlur={handleCollapse}
                bg={isExpanded ? "white" : "#FFF2ED"}
                borderRadius="md"
                width={isExpanded ? "100%" : "150px"}
                transition="width 0.3s ease"
                fontSize={"12px"}
              />
            </InputGroup>
          </Box>

          <Link to="/cart">
            <Flex
              flexDirection="column"
              alignItems="center"
              cursor="pointer"
              position="relative"
            >
              <Box position="relative">
                <IoCartOutline color="gray" size={25} />
                <Box
                  position="absolute"
                  top="-8px"
                  right="-8px"
                  bg="#FF5733"
                  color="white"
                  borderRadius="full"
                  minW="18px"
                  height="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="10px"
                  fontWeight="bold"
                >
                  {cartQuantity}
                </Box>
              </Box>
              <Text color="gray.500" fontSize="12px">
                Cart
              </Text>
            </Flex>
          </Link>

          <Flex
            flexDirection="column"
            alignItems="center"
            onClick={onOpen}
            cursor="pointer"
          >
            <MdAccountCircle color="gray" size={25} />
            <Text color="gray.500" fontSize="12px">
              Account
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Drawer for Mobile Navigation */}
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={10}>
            <Flex flexDirection="column" gap={6}>
              <Link to="/">
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  onClick={onDrawerClose}
                >
                  Home
                </Text>
              </Link>
              <CategoriesPopover />
              <Link to="/custom-order">
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  onClick={onDrawerClose}
                >
                  Custom Order
                </Text>
              </Link>
              <Link to="/my-orders">
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  onClick={onDrawerClose}
                >
                  My Orders
                </Text>
              </Link>

              {/* Search bar */}
              <Box mt={4}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Search2Icon} color="gray.400" />
                  </InputLeftElement>
                  <Input placeholder="Search..." bg="white" borderRadius="md" />
                </InputGroup>
              </Box>

              {/* Cart and Account */}
              <Flex gap={6} mt={6}>
                <Link to="/cart">
                  <Flex flexDirection="column" alignItems="center">
                    <IoCartOutline color="gray" size={25} />
                    <Text color="gray.500" fontSize="12px">
                      Cart
                    </Text>
                  </Flex>
                </Link>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  onClick={onOpen}
                  cursor="pointer"
                >
                  <MdAccountCircle color="gray" size={25} />
                  <Text color="gray.500" fontSize="12px">
                    Account
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Render AccountModal */}
      <AccountModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Navbar;
