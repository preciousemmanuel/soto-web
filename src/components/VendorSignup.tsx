import {
    Box,
    Flex,
    Button,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Icon,
    Image,
    Container,
    useToast,
    FormControl,
    FormErrorMessage,
    InputRightElement,
    Link,
  } from "@chakra-ui/react";
  import { FaBuilding, FaEnvelope, FaPhone, FaImage, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
  import { useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import AuthImage from "../assets/auth.png";
  import { Link as RouterLink } from "react-router-dom";
//   import Logo from "../assets/soto.png";
import apiClient from "../services/axios";
  
  const validationSchema = Yup.object().shape({
    business_name: Yup.string()
      .min(2, "Business name must be at least 2 characters")
      .required("Business name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required"),
    address: Yup.string()
      .required("Business address is required"),
    category: Yup.string()
      .required("Business category is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .required("Business description is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .required("Password is required"),
    business_logo: Yup.mixed()
      .required("Business logo is required")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        return value.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png"].includes(value.type);
      }),
  });
  
  const Vendorsignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast();
  
    const handleSignup = async (values: { [x: string]: string | Blob; }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'business_logo') {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });
  
        const response = await apiClient.post("/business/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 201 || 200) {
          toast({
            title: "Business Registration Successful",
            description: "Your business has been registered successfully!",
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          });
          // Add navigation logic here if needed
        }
      } catch (error) {
        toast({
          title: "Registration Failed",
          description: "An error occurred during registration",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
  
    const formik = useFormik({
      initialValues: {
        business_name: "",
        email: "",
        phone_number: "",
        adress: "",
        category: "",
        description: "",
        password: "",
        business_logo: null,
      },
      validationSchema,
      onSubmit: handleSignup,
    });
  
    const handleFileChange = (event: { target: { files: any[]; }; }) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      formik.setFieldValue("business_logo", file);
    };
  
    return (
      <Box width="100%">
        {/* Navbar remains the same */}
        {/* ... */}
  
        <Container maxW="1200px" px={{ base: 4, md: 8 }}>
          <Flex direction={{ base: "column", md: "row" }} gap={8} justify="center" align="center">
            <Box flex="1" maxW={{ md: "50%" }}>
              <Image
                src={AuthImage}
                display={{ base: "none", md: "block" }}
                w="100%"
                h="auto"
                objectFit="contain"
              />
            </Box>
  
            <Box
              flex="1"
              w="100%"
              maxW={{ base: "100%", md: "500px" }}
              p={{ base: 4, md: 8 }}
              bg="#FFFAF8"
              borderRadius="xl"
            >
              <Box width="100%">
                <Text fontSize="3xl" fontWeight="600" mb={2} textAlign="center" fontFamily="Poppins" color="#FF5733">
                   Business Registration
                </Text>
                <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
                  Enter accurate business information
                </Text>
  
                <form onSubmit={formik.handleSubmit}>
                  {/* Business Name */}
                  <FormControl isInvalid={formik.touched.business_name && formik.errors.business_name} mb={4}>
                    <Text mb={1} color="gray">Business Name</Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaBuilding} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        name="business_name"
                        placeholder="Enter your business name"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('business_name')}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.business_name}</FormErrorMessage>
                  </FormControl>
  
                  {/* Business Email */}
                  <FormControl isInvalid={formik.touched.email && formik.errors.email} mb={4}>
                    <Text mb={1} color="gray">Business Email Address</Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaEnvelope} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        name="email"
                        placeholder="Enter your business email"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('email')}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
  
                  {/* Phone Number */}
                  <FormControl isInvalid={formik.touched.phone_number && formik.errors.phone_number} mb={4}>
                    <Text mb={1} color="gray">Phone Number</Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaPhone} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        name="phone_number"
                        placeholder="Enter your phone number"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('phone_number')}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.phone_number}</FormErrorMessage>
                  </FormControl>
  
                  {/* Business Category */}
                  <FormControl isInvalid={formik.touched.category && formik.errors.category} mb={4}>
                    <Text mb={1} color="gray">Business Category</Text>
                    <InputGroup>
                      <Input
                        name="category"
                        placeholder="Enter your business category"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('category')}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
                  </FormControl>
  
                  {/* Business Address */}
                  <FormControl isInvalid={formik.touched.address && formik.errors.address} mb={4}>
                    <Text mb={1} color="gray">Business Address</Text>
                    <InputGroup>
                      <Input
                        name="address"
                        placeholder="Enter your business address"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('address')}
                      />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                  </FormControl>
  
                  {/* Password Field */}
                  <FormControl isInvalid={formik.touched.password && formik.errors.password} mb={4}>
                    <Text mb={1} color="gray">Password</Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaLock} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        height="52px"
                        bg="#F8EDEA80"
                        borderRadius="xl"
                        fontSize="sm"
                        {...formik.getFieldProps('password')}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                          <Icon as={showPassword ? FaEyeSlash : FaEye} />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  </FormControl>
  
                  {/* Business Description */}
                  <FormControl isInvalid={formik.touched.description && formik.errors.description} mb={4}>
                    <Text mb={1} color="gray">Description</Text>
                    <Textarea
                      name="description"
                      placeholder="Provide a brief description of your business"
                      height="100px"
                      bg="#F8EDEA80"
                      borderRadius="xl"
                      fontSize="sm"
                      {...formik.getFieldProps('description')}
                    />
                    <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                  </FormControl>
  
                  {/* Business Logo */}
                  <FormControl isInvalid={formik.touched.business_logo && formik.errors.business_logo} mb={6}>
                    <Text mb={1} color="gray">Business Logo</Text>
                    <Flex
                      justify="center"
                      align="center"
                      height="52px"
                      bg="#F8EDEA80"
                      borderRadius="xl"
                      cursor="pointer"
                      border="1px dashed gray"
                      color="gray.500"
                      position="relative"
                    >
                      <Icon as={FaImage} mr={2} />
                      <Text fontSize="sm">
                        {selectedFile ? selectedFile.name : "Add a business logo (PNG/JPEG)"}
                      </Text>
                      <Input
                        type="file"
                        accept=".png, .jpeg"
                        position="absolute"
                        opacity={0}
                        cursor="pointer"
                        height="100%"
                        width="100%"
                        onChange={handleFileChange}
                      />
                    </Flex>
                    <FormErrorMessage>{formik.errors.business_logo}</FormErrorMessage>
                  </FormControl>
  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    color="white"
                    bg="#FF5733"
                    height="48px"
                    width="100%"
                    borderRadius="full"
                    mb={4}
                    isLoading={formik.isSubmitting}
                    loadingText="Creating Business..."
                  >
                    Create Business
                  </Button>
                </form>
                <Text textAlign="center" color="gray.600">
              Already have an account?{" "}
              <Link as={RouterLink} color="#FF5733" to="/auth/vendor-login">
                Login
              </Link>
            </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    );
  };
  
  export default Vendorsignup;