import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  React.useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images.length) {
    return null;
  }

  return (
    <HStack spacing={16} align="start">
      <Flex flexDirection="column" gap={8}>
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            boxSize="60px"
            borderRadius="md"
            cursor="pointer"
            border={
              selectedImage === image ? "2px solid red" : "1px solid gray"
            }
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </Flex>
      <Box
        bg="#F6F6F6"
        w="400px"
        h="550px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={selectedImage}
          alt="Selected Product"
          borderRadius="md"
          maxW="100%"
          maxH="100%"
          objectFit="contain"
        />
      </Box>
    </HStack>
  );
};

export default ProductImageGallery;
