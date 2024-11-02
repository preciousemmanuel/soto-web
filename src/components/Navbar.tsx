import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import Logo from "../assets/soto.png";
import { IoCartOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';
// import { Search2Icon } from '@chakra-ui/icons';

const Navbar = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);


  return (
    <Box>
      <Flex
        bg="#FFF2ED"
        py={2}
        px={2}
        justifyContent="space-between"
        flexDirection="row"
      >
        <Flex py={4} px={4}>
          <Link to="/contact">
            <Text color="#FF5733" fontWeight="bold" fontSize="14px" as="u">
              Contact us
            </Text>
          </Link>
        </Flex>

        <Box>
          <Flex py={4} px={4} gap={8}>
            <Flex gap={2} justifyContent="center" alignItems="center">
              <CiLocationOn color="gray" />
              <Text color="gray.500">Location</Text>
            </Flex>
            <Flex gap={2} justifyContent="center" alignItems="center">
              <TbWorld color="gray" />
              <Text color="gray.500">ENG</Text>
            </Flex>
            <Text color="gray.500" fontSize="13px">
              Buy & sell on Soto
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex
        py={6}
        px={6}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Box>
          <Image src={Logo} />
        </Box>
        <Box>
          <Flex gap={6}>
            <Link to="">
              <Text color="gray.500">Home</Text>
            </Link>
            <Link to="">
              <Text color="gray.500">Categories</Text>
            </Link>
            <Link to="">
              <Text color="gray.500">Custom Order</Text>
            </Link>
            <Link to="">
              <Text color="gray.500">My Orders</Text>
            </Link>
          </Flex>
        </Box>

        {/* 3 input section */}
        <Flex gap={6}>
          <Box>
        
          </Box>
          <Box>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IoCartOutline color="gray" size={29} />
              <Text color="gray.500" fontSize={"11px"}>
                Cart
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <MdAccountCircle color="gray" size={29} />
              <Text color="gray.500" fontSize={"11px"}>
                Account
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
