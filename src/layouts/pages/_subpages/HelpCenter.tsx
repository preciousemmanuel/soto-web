import {
  Box,
  Flex,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Icon,
  TabIndicator,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const HelpCenter = () => {
  return (
    <Box
      p={{ base: 4, md: 6 }}
      bg="gray.50"
      borderRadius="lg"
      width="100%"
      maxW={{ base: "100%", md: "800px" }}
      mx="auto"
    >
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab
            fontWeight="500"
            color="gray"
            fontSize={{ base: "sm", md: "md" }}
            px={{ base: 2, md: 4 }}
          >
            FAQs
          </Tab>
          <Tab
            fontWeight="500"
            color="gray"
            fontSize={{ base: "sm", md: "md" }}
            px={{ base: 2, md: 4 }}
          >
            Contact Us
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="#FF5733"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel px={{ base: 0, md: 4 }}>
            {[
              "What is Soto?",
              "Do I have to sign up?",
              "How do I make payment?",
              "Can I cancel my order?",
              "Can a customer be a vendor?",
            ].map((faq, index) => (
              <Flex
                key={index}
                align="center"
                p={{ base: 2, md: 3 }}
                bg="white"
                mb={2}
                borderRadius="md"
              >
                <Text flex="1" fontSize={{ base: "sm", md: "md" }}>
                  {faq}
                </Text>
                <Icon as={FaChevronRight} boxSize={{ base: 3, md: 4 }} />
              </Flex>
            ))}
          </TabPanel>
          <TabPanel px={{ base: 0, md: 4 }}>
            {["Customer Service", "WhatsApp", "Facebook", "Twitter"].map(
              (contact, index) => (
                <Flex
                  key={index}
                  align="center"
                  p={{ base: 2, md: 3 }}
                  bg="white"
                  mb={2}
                  borderRadius="md"
                >
                  <Text flex="1" fontSize={{ base: "sm", md: "md" }}>
                    {contact}
                  </Text>
                  <Icon as={FaChevronRight} boxSize={{ base: 3, md: 4 }} />
                </Flex>
              )
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HelpCenter;
