import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/soto.svg";
import { MdAccountCircle, MdNotifications } from "react-icons/md";
import { HamburgerIcon } from "@chakra-ui/icons";
import NotificationModal, {
  Notification,
} from "../features/modals/NotificationModal";
import { CiLocationOn } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import VendorModal from "../features/modals/VendorModal";
import { useVendor } from "../layouts/hooks/useVendor";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNotificationOpen,
    onOpen: onNotificationOpen,
    onClose: onNotificationClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const { notifications } = useVendor();

  const notificationsList = notifications?.data?.data || [];
  const unreadNotifications = notificationsList.filter(
    (n: Notification) => !n.is_read
  );

  return (
    <Box bg="#FFF2ED" position="fixed" width="100%" zIndex="1000" top="0">
      {/* Top Contact Bar */}
      <Flex
        py={{ base: 1, md: 2 }}
        px={{ base: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        fontSize={{ base: "10px", sm: "12px", md: "14px" }}
        display={{ base: "none", sm: "flex" }}
      >
        <Link to="/contact">
          <Text color="#FF5733" fontWeight="bold" as="u">
            Contact us
          </Text>
        </Link>

        <Flex alignItems="center" gap={{ base: 2, sm: 4, md: 8 }}>
          <Flex gap={1} alignItems="center">
            <CiLocationOn color="gray" size={16} />
            <Text color="gray.500">Location</Text>
          </Flex>
          <Flex gap={1} alignItems="center">
            <TbWorld color="gray" size={16} />
            <Text color="gray.500">ENG</Text>
          </Flex>
          <Link to="/auth/signup">
            <Text color="#FF5733" fontWeight="bold" textDecoration="underline">
              Buy on Soto
            </Text>
          </Link>
        </Flex>
      </Flex>

      {/* Main Navigation Bar */}
      <Flex
        py={{ base: 2, md: 4 }}
        px={{ base: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        bg="white"
      >
        {/* Logo */}
        <Box>
          <Image
            src={Logo}
            width={{ base: "30px", sm: "40px", md: "70px" }}
            cursor="pointer"
            onClick={() => navigate("/vendor-overview")}
          />
        </Box>

        {/* Desktop Navigation Links */}
        <Flex
          display={{ base: "none", md: "flex" }}
          gap={{ base: 4, md: 6 }}
          alignItems="center"
        >
          <Link to="/vendor-overview">
            <Text
              color="gray.500"
              _hover={{ color: "#FF5733" }}
              fontSize={{ base: "14px", md: "16px" }}
            >
              Overview
            </Text>
          </Link>
          <Link to="/vendor-orders">
            <Text
              color="gray.500"
              _hover={{ color: "#FF5733" }}
              fontSize={{ base: "14px", md: "16px" }}
            >
              Orders
            </Text>
          </Link>
          <Link to="/vendor-wallet">
            <Text
              color="gray.500"
              _hover={{ color: "#FF5733" }}
              fontSize={{ base: "14px", md: "16px" }}
            >
              Wallet
            </Text>
          </Link>
          <Link to="/vendor-insight">
            <Text
              color="gray.500"
              _hover={{ color: "#FF5733" }}
              fontSize={{ base: "14px", md: "16px" }}
            >
              Insight
            </Text>
          </Link>
        </Flex>

        {/* Notification and Account Icons */}
        <Flex gap={{ base: 3, md: 6 }} alignItems="center">
          <Box position="relative">
            <Icon
              as={MdNotifications}
              color="gray.500"
              boxSize={{ base: 5, md: 6 }}
              cursor="pointer"
              onClick={onNotificationOpen}
            />
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              bg="#FF5733"
              color="white"
              borderRadius="full"
              fontSize={{ base: "10px", md: "12px" }}
            >
              {unreadNotifications?.length}
            </Badge>
          </Box>
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

          {/* Hamburger Icon for mobile screens */}
          <IconButton
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            onClick={onDrawerOpen}
            variant="ghost"
            aria-label="Open Menu"
            size="sm"
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="lg">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/vendor-overview" onClick={onDrawerClose}>
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  fontSize="md"
                >
                  Overview
                </Text>
              </Link>
              <Link to="/vendor-orders" onClick={onDrawerClose}>
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  fontSize="md"
                >
                  Orders
                </Text>
              </Link>
              <Link to="/vendor-wallet" onClick={onDrawerClose}>
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  fontSize="md"
                >
                  Wallet
                </Text>
              </Link>
              <Link to="/vendor-insight" onClick={onDrawerClose}>
                <Text
                  color="gray.500"
                  _hover={{ color: "#FF5733" }}
                  fontSize="md"
                >
                  Insight
                </Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Render NotificationModal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={onNotificationClose}
      />

      {/* Render AccountModal */}
      <VendorModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SellerNavbar;
