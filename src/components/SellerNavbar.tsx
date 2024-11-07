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
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import Logo from "../assets/soto.png";
  import { MdAccountCircle, MdNotifications } from "react-icons/md";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import AccountModal from "../features/modals/AccountModal";
  import NotificationModal from "../features/modals/NotificationModal";
  
  const SellerNavbar = () => {
   
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
    const {
      isOpen: isDrawerOpen,
      onOpen: onDrawerOpen,
      onClose: onDrawerClose,
    } = useDisclosure();
  
    
  
    return (
      <Box bg="#FFF2ED" position={"fixed"} width={"100%"} zIndex={"1000"}>
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
            <Link to="/overview">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Overview
              </Text>
            </Link>
            <Link to="/orders">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Orders
              </Text>
            </Link>
            <Link to="/wallet">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Wallet
              </Text>
            </Link>
            <Link to="/insight">
              <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                Insight
              </Text>
            </Link>
          </Flex>
  
          {/* Notification and Account Icons */}
          <Flex gap={6} alignItems="center">
            <Icon
              as={MdNotifications}
              color="gray.500"
              boxSize={6}
              cursor="pointer"
              onClick={onNotificationOpen}
            />
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
                <Link to="/overview" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Overview
                  </Text>
                </Link>
                <Link to="/orders" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Orders
                  </Text>
                </Link>
                <Link to="/wallet" onClick={onDrawerClose}>
                  <Text color="gray.500" _hover={{ color: "#FF5733" }}>
                    Wallet
                  </Text>
                </Link>
                <Link to="/insight" onClick={onDrawerClose}>
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
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Box>
    );
  };
  
  export default SellerNavbar;
  