import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Logo from "../../assets/soto.svg";
import Shipping from "../../assets/shipping.png";
import { useAuth } from "../hooks/useAuth";

export default function ShippingAddress() {
  const { register, handleSubmit } = useForm();
  const { addShippingAddress, loading } = useAuth();
  const onSubmit = (data: any) => addShippingAddress(data);

  return (
    <Box pt="25px">
      <Image src={Logo} alt="Logo" py={4} px={8} width="150px" />
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight="calc(100vh - 56px)"
        gap="4"
      >
        <Box
          flex="1"
          bgImage={Shipping}
          bgSize="cover"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
        />

        <form style={{ flex: 1, paddingInline: "42px" }}>
          <Box mb={4}>
            <Text fontSize="30px" fontWeight="bold" mb={4}>
              Shipping Address
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Enter your shipping address details
            </Text>
          </Box>
          <Stack spacing="4" py={9}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                {...register("address", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="State"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                {...register("state", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="City"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                {...register("city", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                placeholder="Country"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                {...register("country", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input
                placeholder="Postal Code"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                {...register("postal_code", {
                  
                  pattern: /^\d+$/,
                })}
              />
            </FormControl>
            <Button
              type="submit"
              color="white"
              bg="#FF5733"
              borderRadius="full"
              mt={6}
              w="full"
              isLoading={loading}
              loadingText="Saving..."
              h="55px"
              size="lg"
              width="100%"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
}
