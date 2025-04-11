import {
  Box,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

const ContactUs = () => {
  return (
    <Box
      bg=""
      p={{ base: 4, sm: 6, md: 8, lg: 10, xl: 12 }}
      minH={{ base: "100vh", md: "calc(100vh - 120px)" }}
      mt={{ base: "120px", sm: "150px", md: "150px" }}
      px={{ base: 2, sm: 4, md: 6, lg: 8 }}
    >
      <Flex
        maxW={{ base: "100%", sm: "90%", md: "1200px", lg: "1500px" }}
        mx="auto"
        borderRadius="md"
        boxShadow="md"
        p={{ base: 4, sm: 6, md: 8 }}
        mb={{ base: 4, sm: 6 }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, sm: 6, md: 8 }}
      >
        {/* Left Section with Header and Commitment Box */}
        <Box
          flex="1"
          bg="white"
          borderRadius="md"
          p={{ base: 4, sm: 6 }}
          boxShadow="md"
          pt={{ base: 6, sm: 12 }}
        >
          <Text
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="#FF5733"
            py={{ base: 2, sm: 4 }}
          >
            Soto
          </Text>
          <Text
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="semibold"
            color="black"
            mb={{ base: 2, sm: 4 }}
          >
            Connect with us <br /> today
          </Text>
          <Text
            color="gray.500"
            mb={{ base: 4, sm: 6 }}
            fontWeight="normal"
            fontSize={{ base: "sm", sm: "md" }}
          >
            Soto is a secure eCommerce platform that <br /> caters to customers,
            vendors, and <br /> administrators. Soto offers you the opportunity{" "}
            <br /> to explore the amazing features on the platform <br /> before
            your decision to sign up.
          </Text>

          {/* Commitment Box */}
          <Box
            bg="#F9F9F9"
            borderRadius="lg"
            boxShadow="sm"
            p={{ base: 4, sm: 6 }}
            mb={{ base: 2, sm: 4 }}
            pt={{ base: 6, sm: 12 }}
          >
            <Text
              fontWeight="bold"
              color="gray.700"
              mb={{ base: 2, sm: 4 }}
              fontSize={{ base: "lg", sm: "xl" }}
            >
              Our Commitment to You
            </Text>
            <Stack
              spacing={{ base: 2, sm: 4 }}
              bg="white"
              pt={2}
              pb={2}
              px={{ base: 2, sm: 4 }}
            >
              {[
                "Swift responses & dedicated support",
                "Efficient & always here to Assist",
                "We listen, understand, and Resolve your complaints on time",
              ].map((item) => (
                <Flex alignItems="center" key={item}>
                  <Box
                    bg="#FF5733"
                    borderRadius="full"
                    p={{ base: 1, sm: 2 }}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={FiCheck}
                      color="white"
                      boxSize={{ base: "12px", sm: "16px" }}
                    />
                  </Box>
                  <Text
                    ml={3}
                    color="gray.600"
                    fontSize={{ base: "sm", sm: "md" }}
                  >
                    {item}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right Section with Contact Form */}
        <Box
          flex="1"
          bg="#F9F9F9"
          borderRadius="md"
          p={{ base: 4, sm: 6 }}
          boxShadow="md"
        >
          <Text
            fontSize={{ base: "lg", sm: "xl" }}
            fontWeight="bold"
            color="gray.700"
            mb={{ base: 4, sm: 6 }}
          >
            Get in Touch
          </Text>
          <form>
            <Flex
              flexWrap="wrap"
              gap={{ base: 4, sm: 6, md: 8 }}
              mb={{ base: 2, sm: 4 }}
            >
              {/* First Name & Last Name */}
              <Flex
                gap={{ base: 2, sm: 4, md: 6 }}
                direction={{ base: "column", md: "row" }}
              >
                <FormControl flex="1">
                  <FormLabel fontSize={{ base: "sm", sm: "md" }}>
                    First Name
                  </FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height={{ base: "40px", sm: "50px" }}
                    width={{ base: "100%", sm: "250px" }}
                    placeholder="First Name"
                    boxShadow="sm"
                    fontSize={{ base: "sm", sm: "md" }}
                  />
                </FormControl>
                <FormControl flex="1">
                  <FormLabel fontSize={{ base: "sm", sm: "md" }}>
                    Last Name
                  </FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height={{ base: "40px", sm: "50px" }}
                    width={{ base: "100%", sm: "250px" }}
                    placeholder="Last Name"
                    boxShadow="sm"
                    fontSize={{ base: "sm", sm: "md" }}
                  />
                </FormControl>
              </Flex>

              {/* Email & Phone */}
              <Flex
                gap={{ base: 2, sm: 4 }}
                direction={{ base: "column", md: "row" }}
              >
                <FormControl flex="1">
                  <FormLabel fontSize={{ base: "sm", sm: "md" }}>
                    Email
                  </FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height={{ base: "40px", sm: "50px" }}
                    width={{ base: "100%", sm: "250px" }}
                    placeholder="Email"
                    boxShadow="sm"
                    fontSize={{ base: "sm", sm: "md" }}
                  />
                </FormControl>
                <FormControl flex="1">
                  <FormLabel fontSize={{ base: "sm", sm: "md" }}>
                    Phone
                  </FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height={{ base: "40px", sm: "50px" }}
                    width={{ base: "100%", sm: "250px" }}
                    placeholder="Phone"
                    boxShadow="sm"
                    fontSize={{ base: "sm", sm: "md" }}
                  />
                </FormControl>
              </Flex>
            </Flex>

            {/* Subject */}
            <FormControl mb={{ base: 2, sm: 4 }}>
              <FormLabel fontSize={{ base: "sm", sm: "md" }}>Subject</FormLabel>
              <Input
                bg="white"
                borderRadius="full"
                height={{ base: "40px", sm: "50px" }}
                placeholder="Subject"
                boxShadow="sm"
                fontSize={{ base: "sm", sm: "md" }}
              />
            </FormControl>

            {/* Message */}
            <FormControl mb={{ base: 4, sm: 6 }}>
              <FormLabel fontSize={{ base: "sm", sm: "md" }}>Message</FormLabel>
              <Textarea
                bg="white"
                borderRadius="lg"
                placeholder="Your message"
                boxShadow="sm"
                fontSize={{ base: "sm", sm: "md" }}
              />
            </FormControl>

            {/* Send Button */}
            <Flex justifyContent="center">
              <Button
                bg="#FF5733"
                color="white"
                borderRadius="full"
                leftIcon={<IoIosSend />}
                _hover={{ bg: "#FF4511" }}
                size={{ base: "md", sm: "lg" }}
                width={{ base: "100%", sm: "300px", md: "400px" }}
                textAlign="center"
                fontSize={{ base: "sm", sm: "md" }}
              >
                Send Message
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default ContactUs;
