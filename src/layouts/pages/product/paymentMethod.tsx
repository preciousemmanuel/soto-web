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
import alat from "../../../assets/alat.png";
import paystack from "../../../assets/paystack.png";
// import paypal from "../../../assets/paypal.png";
// import { useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { useState } from "react";
// import ShippingOptions from "./shippingOptions";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: any) {
  const {
    generatePaymentLinkMutation,
    newOrderResponse,
    isGeneratingPaymentLink,
    generateAlATPaymentLinkMutation,
    isGeneratingAlATPaymentLink,
  } = useOrder();
  const [cardDetails, setCardDetails] = useState<any>({
    card_number: "",
    card_month: "",
    card_year: "",
    card_id: "",
    sec_code: "",
  });

  const generatePayment = () => {
    generatePaymentLinkMutation({
      amount: newOrderResponse?.data?.grand_total,
      narration: "ORDER",
      narration_id: newOrderResponse?.data?._id,
      platform: "web",
    });
  };

  const AlatPayment = () => {
    generateAlATPaymentLinkMutation({
      amount: newOrderResponse?.data?.grand_total,
      card_number: cardDetails.card_number,
      card_month: cardDetails.card_month,
      card_year: cardDetails.card_year,
      sec_code: cardDetails.sec_code,
      narration: "ORDER",
      narration_id: newOrderResponse?.data?._id,
    });
  };

  return (
    <Box mb={6}>
      <Text fontSize="20px" fontWeight="medium" mb={6}>
        Payment Methods
      </Text>
      <RadioGroup
        flexDirection="column"
        gap={6}
        value={paymentMethod}
        onChange={setPaymentMethod}
      >
        <Flex justifyContent="space-between" mb={6}>
          <HStack>
            <Image src={alat} w="40px" rounded="full" />
            <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
              Alat Pay
            </Text>
          </HStack>
          <Radio
            value="alat"
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
      </RadioGroup>
      {paymentMethod === "alat" && (
        <Box p={6} borderRadius="lg" borderWidth="1px" bg="white">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Add Debit Card
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
            {/* <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Holder Name
                </Text>
                <Input
                  placeholder="Enter your name"
                  width="300px"
                  height="50px"
                  value={cardDetails.cardHolderName}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardHolderName: e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem> */}
            <GridItem colSpan={[2, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Card Number
                </Text>
                <Input
                  placeholder="0000 - 0000 - 0000 - 0000"
                  width="300px"
                  height="50px"
                  value={cardDetails.card_number}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      card_number: e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={[3, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Card Month
                </Text>
                <Input
                  placeholder="MM"
                  type="text"
                  width="300px"
                  height="50px"
                  value={cardDetails.card_month}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      card_month: e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem>
            {/* Expiry Date */}
            <GridItem colSpan={[3, 1]}>
              <VStack align="start">
                <Text fontSize="sm" fontWeight="medium">
                  Card Year
                </Text>
                <Input
                  placeholder="YY"
                  type="text"
                  width="300px"
                  height="50px"
                  value={cardDetails.card_year}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      card_year: e.target.value,
                    })
                  }
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
                  placeholder="CVV"
                  type="text"
                  width="300px"
                  height="50px"
                  value={cardDetails.sec_code}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, sec_code: e.target.value })
                  }
                />
              </VStack>
            </GridItem>
          </Grid>
          <Button
            color="white"
            bg="#FF5733"
            h="60px"
            borderRadius="full"
            w="full"
            loadingText="Making payment..."
            isLoading={isGeneratingAlATPaymentLink}
            onClick={AlatPayment}
          >
            Pay now
          </Button>
        </Box>
      )}

      {paymentMethod === "paystack" && (
        <Button
          color="white"
          bg="#FF5733"
          borderRadius="full"
          // mt={2}
          w="full"
          h="55px"
          size="lg"
          loadingText="Making payment..."
          isLoading={isGeneratingPaymentLink}
          onClick={generatePayment}
        >
          Pay now
        </Button>
      )}
    </Box>
  );
}
