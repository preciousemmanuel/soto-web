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
    <Box bg="" p={{ base: 4, md: 8 }} minH="100vh">
      <Flex
        maxW="1500px"
        mx="auto"
        borderRadius="md"
        boxShadow="md"
        p={8}
        mb={6}
        direction={{ base: "column", md: "row" }}
        gap={8}
      >
        {/* Left Section with Header and Commitment Box */}
        <Box flex="1" bg="white" borderRadius="md" p={6} boxShadow="md" pt={12}>
          <Text fontSize="4xl" fontWeight="bold" color="#FF5733" py={4}>
            Soto
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" color="black" mb={4}>
            Connect with us <br /> today
          </Text>
          <Text color="gray.500" mb={6} fontWeight={"normal"}>
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
            p={6}
            mb={4}
            pt={12}
          >
            <Text fontWeight="bold" color="gray.700" mb={4}>
              Our Commitment to You
            </Text>
            <Stack spacing={4} bg={"white"} pt={2} pb={2} px={4}>
              {[
                "Swift responses & dedicated support",
                "Efficient & always here to Assist",
                "We listen, understand, and Resolve your complaints on time",
              ].map((item) => (
                <Flex alignItems="center" key={item}>
                  <Box
                    bg="#FF5733"
                    borderRadius="full"
                    p={2}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiCheck} color="white" />
                  </Box>
                  <Text ml={3} color="gray.600">
                    {item}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right Section with Contact Form */}
        <Box flex="1" bg="#F9F9F9" borderRadius="md" p={6} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={6}>
            Get in Touch
          </Text>
          <form>
            <Flex flexWrap="wrap" gap={8} mb={4}>
              {/* First Name & Last Name */}
              <Flex gap={6} direction={{ base: "column", md: "row" }}>
                <FormControl flex="1">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height="50px"
                    width="250px"
                    placeholder="First Name"
                    boxShadow="sm"
                  />
                </FormControl>
                <FormControl flex="1">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height="50px"
                    width="250px"
                    placeholder="Last Name"
                    boxShadow="sm"
                  />
                </FormControl>
              </Flex>

              {/* Email & Phone */}
              <Flex gap={4} direction={{ base: "column", md: "row" }}>
                <FormControl flex="1">
                  <FormLabel>Email</FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height="50px"
                    width="250px"
                    placeholder="Email"
                    boxShadow="sm"
                  />
                </FormControl>
                <FormControl flex="1">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    bg="white"
                    borderRadius="full"
                    height="50px"
                    width="250px"
                    placeholder="Phone"
                    boxShadow="sm"
                  />
                </FormControl>
              </Flex>
            </Flex>

            {/* Subject */}
            <FormControl mb={4}>
              <FormLabel>Subject</FormLabel>
              <Input
                bg="white"
                borderRadius="full"
                height="50px"
                placeholder="Subject"
                boxShadow="sm"
              />
            </FormControl>

            {/* Message */}
            <FormControl mb={6}>
              <FormLabel>Message</FormLabel>
              <Textarea
                bg="white"
                borderRadius="lg"
                placeholder="Your message"
                rows={6}
                boxShadow="sm"
              />
            </FormControl>

            {/* Send Button */}
            <Flex justifyContent={"center"}>
              <Button
                bg="#FF5733"
                color="white"
                borderRadius="full"
                leftIcon={<IoIosSend />}
                _hover={{ bg: "#FF4511" }}
                size="lg"
                width="400px"
                textAlign={"center"}
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
