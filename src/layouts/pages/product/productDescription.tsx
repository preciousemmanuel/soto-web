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
  productId: any;
}

const ProductDescription = ({
  reviews,
  description,
  productId,
}: ProductDescriptionProps) => {
  return (
    <Box p={{ base: 4, md: 8, lg: 12 }}>
      <Box
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={{ base: 3, md: 4, lg: 5 }}
        px={{ base: 4, md: 8, lg: 14 }}
      >
        <Tabs variant="soft-rounded" isFitted>
          <TabList
            alignItems="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Tab
              _selected={{ color: "#FF5733", bg: "#fff" }}
              fontSize={{ base: "sm", md: "md" }}
              mb={{ base: 2, md: 0 }}
            >
              Description
            </Tab>
            <Tab
              _selected={{ color: "#FF5733", bg: "#fff" }}
              fontSize={{ base: "sm", md: "md" }}
              mb={{ base: 2, md: 0 }}
            >
              Additional Information
            </Tab>
            <Tab
              _selected={{ color: "#FF5733", bg: "#fff" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Reviews [{reviews?.length}]
            </Tab>
          </TabList>

          <TabPanels alignItems="center">
            <TabPanel>
              <Text
                fontSize={{ base: "sm", md: "14px" }}
                fontWeight="normal"
                lineHeight={{ base: "20px", md: "24px" }}
                color="#999999"
                px={{ base: 2, md: 4, lg: 18 }}
              >
                {description}
              </Text>
            </TabPanel>
            <TabPanel>
              <Text
                fontSize={{ base: "sm", md: "14px" }}
                fontWeight="normal"
                lineHeight={{ base: "20px", md: "24px" }}
                color="#999999"
                px={{ base: 2, md: 4, lg: 18 }}
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
              <CustomerReviews reviews={reviews} productId={productId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProductDescription;
