import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  HStack,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
import card from "../../assets/card.png";
import paystack from "../../assets/paystack.png";
import paypal from "../../assets/paypal.png";
import { FaPencilAlt } from "react-icons/fa";
import ShippingOptions from "./product/shippingOptions";
import PaymentMethod from "./product/paymentMethod";

const CheckoutPage = () => {
  return (
    <Box py="120px">
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
      >
        Checkout
      </Text>
      <Box display="flex" p={6} justifyContent="space-between" gap={6} px={40}>
        <Box w="50%">
          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={3}
            mb={6}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text fontSize="xl" fontWeight="medium">
                Shipping Address
              </Text>
              <Text fontSize="sm" w="60%">
                35 Akeem Adigun Street, Ikeja Junction, off Ikosi, Phase 4 Park
                Resort
              </Text>
            </Text>
            <Text
              color="white"
              bg="#FF5733"
              fontSize="sm"
              h="30px"
              w="30px"
              p={2}
              borderRadius={"full"}
              mt={1}
              cursor="pointer"
            >
              <FaPencilAlt />
            </Text>
          </Box>

          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={3}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text fontSize="xl" fontWeight="medium">
                Contact Information
              </Text>
              <Text fontSize="sm">+234 809 555 5555</Text>
            </Text>
            <Text
              color="white"
              bg="#FF5733"
              fontSize="sm"
              h="30px"
              w="30px"
              p={2}
              borderRadius={"full"}
              mt={1}
              cursor="pointer"
            >
              <FaPencilAlt />
            </Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Change Shipping Details
            </Text>
            <Stack spacing={3}>
              <HStack width="100%">
                <Input placeholder="First Name" height="60px" width="50%" />
                <Input placeholder="Last Name" height="60px" width="50%" />
              </HStack>
              <Input placeholder="Email Address" width="100%" height="60px" />
              <Input placeholder="Phone Number" width="100%" height="60px" />
              <Input placeholder="Street Address" width="100%" height="60px" />
              <Input placeholder="Town / City" width="100%" height="60px" />
              <Input placeholder="State" width="100%" height="60px" />
              <Textarea placeholder="Additional Information" />
            </Stack>
          </Box>
        </Box>

        <Box w="50%" p={4}>
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
            <Box mb={6}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Payment Options
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
                <Text fontSize="sm" color="#9F9F9F" mb={6}>
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared.
                </Text>

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

                <Box
                  as="button"
                  w="100%"
                  border="1px dashed gray"
                  p={3}
                  borderRadius="md"
                  textAlign="center"
                >
                  <HStack justify="center">
                    <AddIcon boxSize={3} />
                    <Text fontSize="sm" color="gray.600">
                      Add card
                    </Text>
                  </HStack>
                </Box>
              </RadioGroup>
              <Box my="4">
                <Text fontSize="sm">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </Text>
              </Box>
            </Box>

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
        </Box>
      </Box>
      {/* <PaymentMethod /> */}
    </Box>
  );
};

export default CheckoutPage;
