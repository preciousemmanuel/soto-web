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
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const HelpCenter = () => {
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
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
              {
                question: "What is Soto?",
                answer: "Soto is a secured e-commerce platform aimed at providing same day deliveries for retail and wholesale of provisions, raw food, home items, fashion etc."
              },
              {
                question: "Do I have to sign up?",
                answer: "Soto offers you the opportunity to explore the amazing features on the platform such as making a custom order before your decision to sign up."
              },
              {
                question: "How do I make payment?",
                answer: "There are seamless payment gateways available you get to choose based on your preference."
              },
              {
                question: "Can I cancel my order?",
                answer: "Yes you can, however, there are procedures to follow for a successful cancellation."
              },
              {
                question: "Can a customer be a vendor?",
                answer: "Yes, customers can easily switch from their profile to become a vendor with their business information."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 20-day return policy for most items. Products must be unused, in their original packaging, and accompanied by a receipt. Visit our 'Returns & Refunds' page to initiate a return."
              },
              {
                question: "How long does shipping take?",
                answer: "Standard shipping usually takes 1-7 business days, while express shipping delivers within 3-7hrs. Delivery times may vary based on location and product availability."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship to multiple countries. Shipping costs and delivery times vary by destination. You can check available countries and rates at checkout or on our 'Shipping Information' page."
              }
            ].map((faq, index) => (
              <Flex
                key={index}
                direction="column"
                onClick={() => setIsExpanded(isExpanded === index ? null : index)}
                p={{ base: 2, md: 3 }}
                bg="white"
                mb={2}
                borderRadius="md"
              >
                <Flex align="center">
                  <Text flex="1" fontSize={{ base: "sm", md: "md" }}>
                    {faq.question}
                  </Text>
                  <Icon 
                    as={FaChevronRight} 
                    boxSize={{ base: 3, md: 4 }} 
                    onClick={() => setIsExpanded(isExpanded === index ? null : index)}
                    cursor="pointer"
                  />
                </Flex>
                {isExpanded === index && (
                  <Text mt={2} fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                    {faq.answer}
                  </Text>
                )}
              </Flex>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HelpCenter;
