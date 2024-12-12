import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Avatar,
  Icon,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface User {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

interface Review {
  _id: string;
  comment: string;
  product: string;
  user: User;
  rating: number;
}

interface ReviewCardProps {
  review: Review;
}

interface CustomerReviewsProps {
    reviews: Review[];
  }


const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Box
      bg="#F9F7F7"
      p={4}
      borderRadius="md"
      maxW="320px"
      mx="auto"
    >
      <HStack align="start" spacing={4}>
        <Avatar src={`https://via.placeholder.com/50`} name={`${review?.user?.FirstName} ${review?.user?.LastName}`} />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {`${review?.user?.FirstName} ${review?.user?.LastName}`}
          </Text>
          <HStack spacing={1}>
            {Array.from({ length: review?.rating })?.map((_, index) => (
              <Icon key={index} as={FaStar} color="#FF5733" />
            ))}
          </HStack>
        </Box>
      </HStack>
      <Text mt={4} fontSize="sm" color="gray.600">
        {review.comment}
      </Text>
    </Box>
  );
};


const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h3" size="lg" mb={2}>
            Customer’s Reviews
          </Heading>
          <Text color="gray.500">Hear what other customers say</Text>
        </Box>
        <Button
          size="md"
          variant="link"
          color="#FF5733"
          fontWeight="bold"
        >
          View more →
        </Button>
      </Flex>
      {reviews?.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          No reviews for this product.
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {reviews?.slice(0, 3)?.map((review) => (
            <GridItem key={review?._id}>
              <ReviewCard review={review} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CustomerReviews;
