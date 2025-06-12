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
// import { FaAppleAlt, FaLaptop, FaGift, FaSpa } from "react-icons/fa";
// import { GiClothes, GiCook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../layouts/hooks/useProduct";

const CategoriesModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { categories, setSelectedCategoryId, refetchProductsByCategory } =
    useProduct();

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      setSelectedCategoryId(categoryId);
      await refetchProductsByCategory();
      navigate(`/category-list?category=${categoryId}`);
      onClose()
    } catch (error) {
      setSelectedCategoryId("");
    }
  };

  return (
    <>
      <Text
        onClick={onOpen}
        variant="link"
        color="gray.500"
        _hover={{ color: "#FF5733" }}
        cursor={"pointer"}
      >
        Categories
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex wrap="wrap" justify="space-between">
              {Array.isArray(categories?.data) &&
                categories?.data?.map((category: any, index: any) => (
                  <Flex
                    key={category.name}
                    direction="row"
                    gap={4}
                    align="center"
                    width="48%"
                    py={2}
                    cursor="pointer"
                    onClick={() => fetchProductsByCategory(category?._id)}
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
