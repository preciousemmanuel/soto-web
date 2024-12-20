import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import WishListPage from "./product/wishList";

const Wishlist = () => {
  return (
    <Box p={4} h="100%" textAlign="center">
      <WishListPage />
    </Box>
  );
};

export default Wishlist;
