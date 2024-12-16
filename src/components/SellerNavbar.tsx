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
  import { Link } from "react-router-dom";
  import Logo from "../assets/soto.png";
  import { MdAccountCircle, MdNotifications } from "react-icons/md";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import AccountModal from "../features/modals/AccountModal";
  import NotificationModal, { Notification } from "../features/modals/NotificationModal";
import { CiLocationOn } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import VendorModal from "../features/modals/VendorModal";
import { useVendor } from "../layouts/hooks/useVendor";
  
  const SellerNavbar = () => {
   
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
    const {
      isOpen: isDrawerOpen,
      onOpen: onDrawerOpen,
      onClose: onDrawerClose,
    } = useDisclosure();
  
    const { notifications } = useVendor();

  const notificationsList = notifications?.data?.data || [];
  const unreadNotifications = notificationsList.filter((n: Notification) => !n.is_read);
  
    return (
      <Box bg="#FFF2ED" position={"fixed"} width={"100%"} zIndex={"1000"} top={"0"}>
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
  
          {/* Desktop Navigation links */}
          <Flex
            display={{ base: "none", md: "flex" }}
            gap={6}
            alignItems="center"
          >
            <Link to="/vendor-overview">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Overview
              </Text>
            </Link>
            <Link to="/vendor-orders">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Orders
              </Text>
            </Link>
            <Link to="/vendor-wallet">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Wallet
              </Text>
            </Link>
            <Link to="/vendor-insight">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Insight
              </Text>
            </Link>
          </Flex>
  
          {/* Notification and Account Icons */}
          <Flex gap={6} alignItems="center">
            <Box position="relative">
              <Icon
                as={MdNotifications}
                color="gray.500"
                boxSize={6}
                cursor="pointer"
                onClick={onNotificationOpen}
              />
             
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  bg="#FF5733"
                  color ="white"
                  borderRadius="full"
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
            />
          </Flex>
        </Flex>
  
        {/* Mobile Drawer */}
        <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <Link to="/vendor-overview" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Overview
                  </Text>
                </Link>
                <Link to="/vendor-orders" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Orders
                  </Text>
                </Link>
                <Link to="/vendor-wallet" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Wallet
                  </Text>
                </Link>
                <Link to="/vendor-insight" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Insight
                  </Text>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
  
        {/* Render NotificationModal */}
        <NotificationModal isOpen={isNotificationOpen} onClose={onNotificationClose} />
  
        {/* Render AccountModal */}
        <VendorModal isOpen={isOpen} onClose={onClose} />
      </Box>
    );
  };
  
  export default SellerNavbar;
  