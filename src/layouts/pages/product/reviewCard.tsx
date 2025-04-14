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
    <Box
      bg="#F9F7F7"
      p={{ base: 3, md: 4 }}
      borderRadius="md"
      maxW={{ base: "100%", sm: "400px", md: "500px" }}
      mx="auto"
    >
      <HStack align="start" spacing={{ base: 3, md: 4 }}>
        <Avatar
          size={{ base: "sm", md: "md" }}
          src={`https://via.placeholder.com/50`}
          name={`${review?.user?.FirstName} ${review?.user?.LastName}`}
        />
        <Box>
          <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
            {`${review?.user?.FirstName} ${review?.user?.LastName}`}
          </Text>
          <HStack spacing={1}>
            {Array.from({ length: review?.rating })?.map((_, index) => (
              <Icon
                key={index}
                as={FaStar}
                color="#FF5733"
                boxSize={{ base: "12px", md: "16px" }}
              />
            ))}
          </HStack>
        </Box>
      </HStack>
      <Text
        mt={{ base: 3, md: 4 }}
        fontSize={{ base: "xs", md: "sm" }}
        color="gray.600"
      >
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
  const { reviewMutation, refetch } = useProduct();
  const {
    mutate: createReview,
    isPending: isLoadings,
    isSuccess,
  } = reviewMutation;

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
    refetch();
  }, [isSuccess]);

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
    <Box p={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={{ base: 4, md: 6 }}>
        <Box>
          <Heading as="h3" size={{ base: "md", md: "lg" }} mb={2}>
            Customer’s Reviews
          </Heading>
          <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
            Hear what other customers say
          </Text>
        </Box>
        {/* <Button size={{ base: "sm", md: "md" }} variant="link" color="#FF5733" fontWeight="bold">
          View more →
        </Button> */}
      </Flex>
      {reviews?.length === 0 ? (
        <VStack
          spacing={{ base: 4, md: 6 }}
          align="stretch"
          maxWidth={{ base: "100%", md: "700px" }}
          mx="auto"
          py={{ base: 6, md: 10 }}
          px={{ base: 2, md: 0 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl pb={{ base: 3, md: 4 }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Your rating
              </FormLabel>
              {renderStars(selectedRating)}
            </FormControl>

            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }} color="gray.700">
                Comment
              </FormLabel>
              <Controller
                name="comment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    height={{ base: "150px", md: "200px" }}
                    placeholder="Type your comment"
                    borderColor="gray.300"
                    _focus={{ borderColor: "orange.400" }}
                    _hover={{ borderColor: "gray.400" }}
                    resize="none"
                    fontSize={{ base: "sm", md: "md" }}
                  />
                )}
              />
            </FormControl>

            <Button
              mt={4}
              color="white"
              bg="#FF5753"
              size={{ base: "md", md: "lg" }}
              w="full"
              borderRadius="md"
              type="submit"
              loadingText="Submit..."
              isLoading={isLoadings}
              fontSize={{ base: "sm", md: "md" }}
            >
              Submit
            </Button>
          </form>
        </VStack>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
          gap={{ base: 4, md: 6 }}
        >
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
