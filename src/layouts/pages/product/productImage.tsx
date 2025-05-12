import { Box, Flex, Image } from "@chakra-ui/react";
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
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 16 }}
      align={{ base: "center", md: "start" }}
      mt={{ base: 16, md: 0 }}
    >
      <Flex
        direction={{ base: "row", md: "column" }}
        gap={{ base: 2, md: 8 }}
        overflowX={{ base: "auto", md: "visible" }}
        w={{ base: "100%", md: "auto" }}
        py={{ base: 2, md: 0 }}
        display={{ base: "none", md: "flex" }}
      >
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            boxSize={{ base: "50px", md: "60px" }}
            borderRadius="md"
            cursor="pointer"
            border={
              selectedImage === image ? "2px solid red" : "1px solid gray"
            }
            onClick={() => setSelectedImage(image)}
            flexShrink={0}
          />
        ))}
      </Flex>
      <Box
        bg="#F6F6F6"
        w={{ base: "100%", sm: "80%", md: "400px" }}
        h={{ base: "300px", sm: "400px", md: "550px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
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
    </Flex>
  );
};

export default ProductImageGallery;
