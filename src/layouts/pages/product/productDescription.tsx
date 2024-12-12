import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import CustomerReviews from "./reviewCard";

interface ProductDescriptionProps {
  reviews: any[]; 
  description: string;
}

const ProductDescription = ({ reviews, description }: ProductDescriptionProps) => {
  return (
    <Box p={12}>
      <Box
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={5}
        px={14}
      >
        <Tabs variant="soft-rounded" isFitted>
          <TabList alignItems="center">
            <Tab _selected={{ color: "#FF5733", bg: "#fff" }}>Description</Tab>
            <Tab _selected={{ color: "#FF5733", bg: "#fff" }}>
              Additional Information
            </Tab>
            <Tab _selected={{ color: "#FF5733", bg: "#fff" }}>Reviews [{reviews?.length}]</Tab>
          </TabList>

          <TabPanels alignItems="center">
            <TabPanel>
              <Text
                fontSize="14px"
                fontWeight="normal"
                lineHeight="24px"
                color="#999999"
                px={18}
              >
               {description}
              </Text>
            </TabPanel>
            <TabPanel>
              <Text
                fontSize="14px"
                fontWeight="normal"
                lineHeight="24px"
                color="#999999"
                px={18}
              >
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
              </Text>
            </TabPanel>
            <TabPanel>
              <CustomerReviews reviews={reviews}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProductDescription;
