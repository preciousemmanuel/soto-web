import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Badge,
  useClipboard,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import { format, formatDate } from "date-fns";

export const CouponCard = ({ title, code, expiryDate }:any) => {
  const { hasCopied, onCopy } = useClipboard(code);
  const formattedExpiryDate = format(new Date(expiryDate), "do MMMM yyyy");
  return (
    <Box
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="white"
    >
      {/* Title Section */}
      <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
        {title}
      </Text>

      {/* Coupon Code Section */}
      <Flex
        align="center"
        justify="space-between"
        bg="gray.100"
        p={3}
        borderRadius="md"
        mb={3}
      >
        <Text fontWeight="medium" color="gray.700">
          {code}
        </Text>
        
         <IconButton
          aria-label="Copy code"
          icon={hasCopied ? <FiCopy color="green" /> : <FiCopy />}
          onClick={onCopy}
          size="sm"
          variant="ghost"
        /> 
      </Flex>

      <HStack justify="space-between" mb={2}>
        <Badge colorScheme="green" fontSize="0.8em">
        Expires on: {formattedExpiryDate}
        </Badge>
      </HStack>
    </Box>
  );
};

// const CouponList = () => {
//   const coupons = [
//     {
//       title: "10% Off Your First Order",
//       code: "WELCOME10",
//       expiryDate: "2025-01-31",
//     },
//     {
//       title: "Free Shipping on Orders Over $50",
//       code: "FREESHIP",
//       expiryDate: "2025-02-15",
//     },
//   ];

//   return (
//     <VStack spacing={4} p={5}>
//       {coupons.map((coupon, index) => (
//         <CouponCard
//           key={index}
//           title={coupon.title}
//           code={coupon.code}
//           expiryDate={coupon.expiryDate}
//         />
//       ))}
//     </VStack>
//   );
// };

// export default CouponList;
