import React from "react";
import {
  Box,
  HStack,
  Radio,
  Text,
  useRadio,
  useRadioGroup,
  RadioGroup,
  VStack,
  StackProps,
  Flex,
} from "@chakra-ui/react";

interface CustomRadioProps extends StackProps {
  value: string;
  children: React.ReactNode;
  title: string;
}

const CustomRadio: React.FC<CustomRadioProps> = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <HStack
        {...checkbox}
        as="div"
        bg="#F9F9F9"
        cursor="pointer"
        borderRadius="15px"
        p={4}
        justify="space-between"
        align="center"
        _checked={{
          bg: "#FF57331A",
        }}
        _hover={{
          bg: "#FF57331A",
        }}
        w="100%"
        onClick={input.onClick}
      >
        <Flex gap={3}>
          <Radio
            _checked={{
              bg: "#FF5733",
            }}
            {...checkbox}
            isChecked={input.checked}
            onChange={input.onChange}
            size="lg"
          />
          <Text fontSize="md" fontWeight="medium" pl="6px">
            {props.title}
          </Text>
        </Flex>
        {props.children}
      </HStack>
    </Box>
  );
};

const ShippingOptions: React.FC = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "shipping",
    defaultValue: "standard",
  });

  const group = getRootProps();
  return (
    <Box {...group} role="radio">
      <VStack spacing={4} w="100%">
        <CustomRadio
          {...getRadioProps({ value: "standard" })}
          value="standard"
          title="Standard"
        >
          <Box bg="white" px={3} py={1}>
            <Text color="#FF5733" fontSize="sm">
              4-7 days
            </Text>
          </Box>
          <Text fontWeight="medium">Free</Text>
        </CustomRadio>

        <CustomRadio
          {...getRadioProps({ value: "express" })}
          value="express"
          title="Express"
        >
          <Box bg="white" px={3} py={1}>
            <Text color="#FF5733" fontSize="sm">
              1-2 days
            </Text>
          </Box>
          <Text fontWeight="medium">₦2000</Text>
        </CustomRadio>
      </VStack>
    </Box>
  );
};

export default ShippingOptions;
