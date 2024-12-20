import React, { useEffect, useState } from "react";
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
  VStack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useProduct } from "../../hooks/useProduct";

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
  productId: any;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Box bg="#F9F7F7" p={4} borderRadius="md" maxW="320px" mx="auto">
      <HStack align="start" spacing={4}>
        <Avatar
          src={`https://via.placeholder.com/50`}
          name={`${review?.user?.FirstName} ${review?.user?.LastName}`}
        />
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

const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  productId,
}) => {
  const { control, handleSubmit } = useForm();
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const { reviewMutation,refetch } = useProduct();
  const { mutate: createReview, isPending: isLoadings, isSuccess } = reviewMutation;

  const onSubmit = (data: any) => {
    createReview({
      productId,
      formData: {
        rating: selectedRating,
        comment: data.comment,
      },
    });
  };

  useEffect(() => {
    refetch()
  }, [isSuccess])
  

  const renderStars = (rating: number) => {
    return Array(5)
      .fill("")
      .map((_, i) => (
        <StarIcon
          key={i}
          color={i < rating ? "#FF8A00" : "gray.200"}
          fontSize="28px"
          onClick={() => setSelectedRating(i + 1)}
          cursor="pointer"
        />
      ));
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading as="h3" size="lg" mb={2}>
            Customer’s Reviews
          </Heading>
          <Text color="gray.500">Hear what other customers say</Text>
        </Box>
        {/* <Button size="md" variant="link" color="#FF5733" fontWeight="bold">
          View more →
        </Button> */}
      </Flex>
      {reviews?.length === 0 ? (
        <VStack
          spacing={6}
          align="stretch"
          maxWidth="700px"
          mx="auto"
          py="40px"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl pb="18px">
              <FormLabel fontSize="md" color="gray.700">
                Your rating
              </FormLabel>
              {renderStars(selectedRating)}
            </FormControl>

            <FormControl>
              <FormLabel fontSize="md" color="gray.700">
                Comment
              </FormLabel>
              <Controller
                name="comment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    height="200px"
                    placeholder="Type your comment"
                    borderColor="gray.300"
                    _focus={{ borderColor: "orange.400" }}
                    _hover={{ borderColor: "gray.400" }}
                    resize="none"
                  />
                )}
              />
            </FormControl>

            <Button
              mt={4}
              color="white"
              bg="#FF5753"
              size="lg"
              w="full"
              borderRadius="md"
              type="submit"
              loadingText="Submit..."
              isLoading={isLoadings}
            >
              Submit
            </Button>
          </form>
        </VStack>
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
