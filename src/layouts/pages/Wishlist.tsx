import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import WishListPage from "./product/wishList";
import { useEffect } from "react";

const Wishlist = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Box p={4} h="100%" textAlign="center">
      <WishListPage />
    </Box>
  );
};

export default Wishlist;
