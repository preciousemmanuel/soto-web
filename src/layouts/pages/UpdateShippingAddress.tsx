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
  const { updateShippingAddress, loading } = useAuth();
  const onSubmit = (data: any) => updateShippingAddress(data);

  return (
    <Box pt={{ base: "15px", md: "25px" }}>
      <Image
        src={Logo}
        alt="Logo"
        py={{ base: 2, md: 4 }}
        px={{ base: 4, md: 8 }}
        width={{ base: "100px", md: "150px" }}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight={{ base: "auto", md: "calc(100vh - 56px)" }}
        gap={{ base: 2, md: 4 }}
      >
        <Box
          flex="1"
          bgImage={Shipping}
          bgSize="cover"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
          minHeight={{ base: "200px", md: "auto" }}
        />

        <form
          style={{
            flex: 1,
            paddingInline: "42px",
          }}
        >
          <Box mb={{ base: 2, md: 4 }}>
            <Text
              fontSize={{ base: "24px", md: "30px" }}
              fontWeight="bold"
              mb={{ base: 2, md: 4 }}
            >
              Shipping Address
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="normal">
              Enter your shipping address details
            </Text>
          </Box>
          <Stack spacing={{ base: 2, md: 4 }} py={{ base: 4, md: 9 }}>
            {["address", "state", "city", "country", "postal_code"].map(
              (field) => (
                <FormControl key={field}>
                  <FormLabel>{field.replace("_", " ").toUpperCase()}</FormLabel>
                  <Input
                    placeholder={field.replace("_", " ").toUpperCase()}
                    height={{ base: "40px", md: "52px" }}
                    bg="#F8EDEA80"
                    outline="none"
                    borderRadius="xl"
                    fontSize={{ base: "xs", md: "sm" }}
                    width="100%"
                    {...register(field, {
                      required: field !== "postal_code",
                      ...(field === "postal_code" && { pattern: /^\d+$/ }),
                    })}
                  />
                </FormControl>
              )
            )}
            <Button
              type="submit"
              color="white"
              bg="#FF5733"
              borderRadius="full"
              mt={{ base: 4, md: 6 }}
              w="full"
              isLoading={loading}
              loadingText="Saving..."
              h={{ base: "45px", md: "55px" }}
              size={{ base: "md", md: "lg" }}
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
