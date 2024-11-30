import {
  Box,
  Text,
  Input,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Button,
  HStack,
  Divider,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import card from "../../../assets/card.png";
import paystack from "../../../assets/paystack.png";
import paypal from "../../../assets/paypal.png";
import ShippingOptions from "./shippingOptions";

export default function PaymentMethod() {
  return (
    <Flex direction="row" justify="space-between" px={24}>
      <Box mb={6}>
        <Text fontSize="30px" fontWeight="semibold" mb={4}>
          Payment Methods
        </Text>
        <RadioGroup flexDirection="column" gap={6}>
          <Flex justifyContent="space-between" mb={2}>
            <HStack>
              <Image src={card} />
              <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                Credit card
              </Text>
            </HStack>
            <Radio
              value="credit-card"
              size="lg"
              _checked={{
                bg: "#FF5733",
              }}
            ></Radio>
          </Flex>

          <Flex justifyContent="space-between" mb={6}>
            <HStack>
              <Image src={paystack} />
              <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                PayStack
              </Text>
            </HStack>
            <Radio
              value="paystack"
              size="lg"
              _checked={{
                bg: "#FF5733",
              }}
            ></Radio>
          </Flex>

          <Flex justifyContent="space-between" mb={6}>
            <HStack>
              <Image src={paypal} />
              <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                Paypal
              </Text>
            </HStack>
            <Radio
              value="paypal"
              size="lg"
              _checked={{
                bg: "#FF5733",
              }}
            ></Radio>
          </Flex>
        </RadioGroup>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="md"
          borderWidth="1px"
          bg="white"
          //   maxW="lg"
          mx="auto"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Add Debit Card
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
            {/* Holder Name */}
            <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Holder Name
                </Text>
                <Input
                  placeholder="Enter your name"
                  width="300px"
                  height="60px"
                />
              </VStack>
            </GridItem>

            {/* Card Number */}
            <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Card Number
                </Text>
                <Input
                  placeholder="0000 - 0000 - 0000 - 0000"
                  width="300px"
                  height="60px"
                />
              </VStack>
            </GridItem>

            {/* Expiry Date */}
            <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Expiry Date
                </Text>
                <Input
                  placeholder="Select expiry date"
                  type="text"
                  width="300px"
                  height="60px"
                />
              </VStack>
            </GridItem>

            {/* CVV */}
            <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  CVV
                </Text>
                <Input
                  placeholder="Enter card CVV"
                  type="text"
                  width="300px"
                  height="60px"
                />
              </VStack>
            </GridItem>
          </Grid>

          {/* Buttons */}
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Button
              color="#FF5733"
              bg="white"
              borderRadius="full"
              variant="outline"
              h="60px"
            >
              Cancel
            </Button>
            <Button
              color="white"
              bg="#FF5733"
              h="60px"
              borderRadius="full"
              w="full"
            >
              Checkout
            </Button>
          </Grid>
        </Box>
      </Box>
      <Flex direction="column">
        <Text fontSize="30px" fontWeight="semibold" mb={4}>
          Order Summary
        </Text>
        <Box mb={6}>
          <Flex justifyContent="space-between">
            <Text fontSize="xl" fontWeight="semibold">
              Product
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Subtotal
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontSize="14px" color="#9F9F9F">
              Argent sofa x 3
            </Text>
            <Text mt={2}>₦240,000.00</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text mt={2}>₦240,000.00</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="medium">Total Amount</Text>
            <Text mt={2}>₦504,000.00</Text>
          </Flex>
        </Box>

        <Box p={2}>
          <Divider my={4} />

          <Box mb={6}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Shipping Options
            </Text>
            <ShippingOptions />
          </Box>

          <Text fontSize="sm" color="gray.600" mt={4}>
            Delivered on or before Saturday, 16 October 2024
          </Text>

          <Button
            color="white"
            bg="#FF5733"
            borderRadius="full"
            mt={6}
            w="full"
            h="55px"
            size="lg"
          >
            Pay now
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
