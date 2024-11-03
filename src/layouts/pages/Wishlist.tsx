import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import Wishlist1 from "../../assets/Cart.png"
import Wishlist2 from "../../assets/speaker.png"

const Wishlist = () => {
  return (
    <Box p={4}  minH="100vh" textAlign="center" mt={120} >
      <Heading size="lg" mb={4} bg={"#FFF2ED"} fontWeight={"bold"} py={6} px={6} fontFamily={"Poppins"}>
       Wishlist
      </Heading>
      <Text fontSize="lg" mb={6} textAlign={"left"} color={"#FF5733"}>
        Wishlist (4)
      </Text>
      <SimpleGrid columns={[2, 4]} spacing={4} justifyContent="center">
        {/* Add your images here */}
        <Image src={Wishlist1} alt="Wishlist Item 1" />
        <Image src={Wishlist2} alt="Wishlist Item 2" />
        <Image src={Wishlist1} alt="Wishlist Item 3" />
        <Image src={Wishlist2} alt="Wishlist Item 4" />
        <Image src={Wishlist1} alt="Wishlist Item 5" />
        <Image src={Wishlist2} alt="Wishlist Item 6" />
        <Image src={Wishlist1} alt="Wishlist Item 7" />
        <Image src={Wishlist2} alt="Wishlist Item 8" />
      </SimpleGrid>
    </Box>
  );
}

export default Wishlist;
