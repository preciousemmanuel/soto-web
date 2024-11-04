import {
  Box,
  Text,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaAppleAlt, FaLaptop, FaGift, FaSpa } from "react-icons/fa";
import { GiClothes, GiCook } from "react-icons/gi";

// Sample categories with icons
const categories = [
  { name: "Groceries", icon: FaAppleAlt },
  { name: "Foodstuffs", icon: GiCook },
  { name: "Fashion", icon: GiClothes },
  { name: "Computers", icon: FaLaptop },
  { name: "Decorative & Gifts", icon: FaGift },
  { name: "Beauty & Health", icon: FaSpa },
  { name: "Groceries", icon: FaAppleAlt },
  { name: "Foodstuffs", icon: GiCook },
  { name: "Fashion", icon: GiClothes },
  { name: "Computers", icon: FaLaptop },
  { name: "Decorative & Gifts", icon: FaGift },
  { name: "Beauty & Health", icon: FaSpa },
];

const CategoriesModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text onClick={onOpen} variant="link" color="gray.500" _hover={{ color: "#FF5733" }} cursor={"pointer"}>
        Categories
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" justify="space-between">
              {categories.map((category, index) => (
                <Flex
                  key={category.name}
                  direction="row"
                  gap={4}
                  align="center"
                  width="48%" // Ensures two items per row
                  py={2}
                >
                  <Box
                    bg={index % 2 === 0 ? "#FFF2ED" : "lightgreen"}
                    p={2}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    py={2}
                  >
                    <Icon as={category.icon} color="gray.500" boxSize={6} />
                  </Box>
                  <Text mt={2} color="gray.600" fontSize="sm">
                    {category.name}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoriesModal;
