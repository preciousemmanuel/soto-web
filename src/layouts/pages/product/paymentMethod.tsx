import {
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  HStack,
  Divider,
  Image,
  Flex,
  VStack,
  useToast,
} from "@chakra-ui/react";
import alat from "../../../assets/alat.png";
import paystack from "../../../assets/paystack.png";
// import paypal from "../../../assets/paypal.png";
// import { useState } from "react";
import { useOrder } from "../../hooks/useOrder";
// import { useState } from "react";
import AlatpayButton from "./AlatPay";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ShippingOptions from "./shippingOptions";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  amount,
}: any) {
  const {
    generatePaymentLinkMutation,
    newOrderResponse: orderDataFromHook,
    isGeneratingPaymentLink,
    generateAlATPaymentMutation,
    // clearCart,
    // isGeneratingAlATPaymentLink,
  } = useOrder();
  const { user } = useAuth();
  // const toast = useToast();
  // const navigate = useNavigate();
  // const [alatResponse, setAlatResponse] = useState<any | null>(null);
  // const [cardDetails, setCardDetails] = useState<any>({
  //   card_number: "",
  //   card_month: "",
  //   card_year: "",
  //   sec_code: "",
  // });
  const [alatResponse, setAlatResponse] = useState<any | null>(null);

  const generateAlATPayment = async () => {
    const savedOrder = localStorage.getItem("orderResponse");
    const orderData =
      orderDataFromHook || (savedOrder ? JSON.parse(savedOrder) : null);
    const orderId = orderData?._id || orderData?.data?._id;

    if (!orderId) {
      return;
    }

    const paymentRequest: any = {
      amount,
      narration: "ORDER",
      narration_id: orderId,
    };

    generateAlATPaymentMutation(paymentRequest, {
      onSuccess: (response) => {
        if (response.status === "success") {
          setAlatResponse(response?.data);
        }
      },
    });
  };
  // console.log(alatResponse, "ALAT");

  const generatePayment = () => {
    let orderData = orderDataFromHook;
    if (!orderData) {
      const savedOrder = localStorage.getItem("orderResponse");
      if (savedOrder) {
        orderData = JSON.parse(savedOrder);
      }
    }
    const orderId = orderData?._id || orderData?.data?._id;

    if (!orderId) {
      console.error("Order ID is missing", orderData);
      return;
    }

    generatePaymentLinkMutation({
      amount: amount,
      narration: "ORDER",
      narration_id: orderId,
      platform: "web",
    });
  };

  // const AlatPayment = () => {
  //   generateAlATPaymentLinkMutation({
  //     amount: newOrderResponse?.data?.grand_total,
  //     card_number: cardDetails.card_number,
  //     card_month: cardDetails.card_month,
  //     card_year: cardDetails.card_year,
  //     sec_code: cardDetails.sec_code,
  //     narration: "ORDER",
  //     narration_id: newOrderResponse?.data?._id,
  //     // order: "6763c0f1ccc03ae8d0fbcd1b"
  //   });
  // };

  return (
    <Box mb={6} px={{ base: 4, md: 0 }}>
      <Text fontSize={{ base: "18px", md: "20px" }} fontWeight="medium" mb={6}>
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
            <Image src={alat} w={{ base: "30px", md: "40px" }} rounded="full" />
            <Text
              fontWeight="normal"
              color="#9F9F9F"
              fontSize={{ base: "sm", md: "md" }}
            >
              Alat Pay
            </Text>
          </HStack>
          <Radio
            value="alat"
            size={{ base: "md", md: "lg" }}
            _checked={{
              bg: "#FF5733",
            }}
          ></Radio>
        </Flex>

        <Flex justifyContent="space-between" mb={6}>
          <HStack>
            <Image src={paystack} w={{ base: "80px", md: "auto" }} />
            <Text
              fontWeight="normal"
              color="#9F9F9F"
              fontSize={{ base: "sm", md: "md" }}
            >
              PayStack
            </Text>
          </HStack>
          <Radio
            value="paystack"
            size={{ base: "md", md: "lg" }}
            _checked={{
              bg: "#FF5733",
            }}
          ></Radio>
        </Flex>
      </RadioGroup>
      {paymentMethod === "alat" && (
        // <Box p={{ base: 4, md: 6 }} borderRadius="lg" borderWidth="1px" bg="white">
        //   <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={4}>
        //     Add Debit Card
        //   </Text>

        //   <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} mb={6}>
        //     <GridItem colSpan={{ base: 1, md: 2 }}>
        //       <VStack align="start">
        //         <Text fontSize="sm" fontWeight="medium">
        //           Card Number
        //         </Text>
        //         <Input
        //           placeholder="0000 - 0000 - 0000 - 0000"
        //           width="100%"
        //           height={{ base: "40px", md: "50px" }}
        //           value={cardDetails.card_number}
        //           onChange={(e) =>
        //             setCardDetails({
        //               ...cardDetails,
        //               card_number: e.target.value,
        //             })
        //           }
        //         />
        //       </VStack>
        //     </GridItem>
        //     <GridItem>
        //       <VStack align="start">
        //         <Text fontSize="sm" fontWeight="medium">
        //           Card Month
        //         </Text>
        //         <Input
        //           placeholder="MM"
        //           type="text"
        //           width="100%"
        //           height={{ base: "40px", md: "50px" }}
        //           value={cardDetails.card_month}
        //           onChange={(e) =>
        //             setCardDetails({
        //               ...cardDetails,
        //               card_month: e.target.value,
        //             })
        //           }
        //         />
        //       </VStack>
        //     </GridItem>
        //     <GridItem>
        //       <VStack align="start">
        //         <Text fontSize="sm" fontWeight="medium">
        //           Card Year
        //         </Text>
        //         <Input
        //           placeholder="YY"
        //           type="text"
        //           width="100%"
        //           height={{ base: "40px", md: "50px" }}
        //           value={cardDetails.card_year}
        //           onChange={(e) =>
        //             setCardDetails({
        //               ...cardDetails,
        //               card_year: e.target.value,
        //             })
        //           }
        //         />
        //       </VStack>
        //     </GridItem>
        //     <GridItem colSpan={{ base: 1, md: 2 }}>
        //       <VStack align="start">
        //         <Text fontSize="sm" fontWeight="medium">
        //           CVV
        //         </Text>
        //         <Input
        //           placeholder="CVV"
        //           type="text"
        //           width="100%"
        //           height={{ base: "40px", md: "50px" }}
        //           value={cardDetails.sec_code}
        //           onChange={(e) =>
        //             setCardDetails({ ...cardDetails, sec_code: e.target.value })
        //           }
        //         />
        //       </VStack>
        //     </GridItem>
        //   </Grid>
        //   <Button
        //     color="white"
        //     bg="#FF5733"
        //     h={{ base: "50px", md: "60px" }}
        //     borderRadius="full"
        //     w="full"
        //     loadingText="Making payment..."
        //     isLoading={isGeneratingAlATPaymentLink}
        //     onClick={AlatPayment}
        //   >
        //     Pay now
        //   </Button>
        // </Box>
        <AlatpayButton
          email={alatResponse?.Email}
          firstName={alatResponse?.FirstName}
          lastName={alatResponse?.LastName}
          phone={alatResponse?.Phone}
          amount={amount}
          metadata={alatResponse?.Metadata}
          onBeforePayment={generateAlATPayment}
        />
      )}

      {paymentMethod === "paystack" && (
        <Button
          color="white"
          bg="#FF5733"
          borderRadius="full"
          w="full"
          h={{ base: "50px", md: "55px" }}
          size={{ base: "md", md: "lg" }}
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
