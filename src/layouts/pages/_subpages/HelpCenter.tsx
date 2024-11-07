import { Box, Flex, Text, Tab, TabList, TabPanel, TabPanels, Tabs, Icon, TabIndicator } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const HelpCenter = () => { return (
  <Box p={6} bg="gray.50" borderRadius="lg" width="100%">
    <Tabs position='relative' variant='unstyled'>
      <TabList>
        <Tab fontWeight={"500"} color={"gray"}>FAQs</Tab>
        <Tab fontWeight={"500"} color={"gray"}>Contact Us</Tab>
      </TabList>
      <TabIndicator mt='-1.5px' height='2px' bg='#FF5733' borderRadius='1px' /> 
      <TabPanels>
        <TabPanel>
          {["What is Soto?", "Do I have to sign up?", "How do I make payment?", "Can I cancel my order?", "Can a customer be a vendor?"].map((faq, index) => (
            <Flex key={index} align="center" p={3} bg="white" mb={2} borderRadius="md">
              <Text flex="1">{faq}</Text>
              <Icon as={FaChevronRight} />
            </Flex>
          ))}
        </TabPanel>
        <TabPanel>
          {["Customer Service", "WhatsApp", "Facebook", "Twitter"].map((contact, index) => (
            <Flex key={index} align="center" p={3} bg="white" mb={2} borderRadius="md">
              <Text flex="1">{contact}</Text>
              <Icon as={FaChevronRight} />
            </Flex>
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);
}

export default HelpCenter;
