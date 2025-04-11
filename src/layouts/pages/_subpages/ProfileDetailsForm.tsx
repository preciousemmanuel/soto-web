import {
  Box,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const ProfileDetailsForm: React.FC = () => {
  const { user, refetchProfile, loading, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ShippingAddress: { country: "" },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        FirstName: user.FirstName || "",
        LastName: user.LastName || "",
        Email: user.Email || "",
        ShippingAddress: { country: user.ShippingAddress?.country || "" },
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    if (field === "ShippingAddress") {
      setFormData((prev) => ({
        ...prev,
        ShippingAddress: { ...prev.ShippingAddress, country: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    // Update the user state with new formData values
    updateProfile(formData);
  };

  return (
    <Box
      p={{ base: 4, sm: 6, md: 8, lg: 12 }}
      bg="white"
      borderRadius="lg"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text
        color="#FF5733"
        fontWeight="bold"
        textAlign="left"
        fontSize={{ base: "14px", sm: "15px", md: "16px", lg: "17px" }}
        mb={{ base: 2, sm: 3, md: 4 }}
        textDecoration="underline"
        fontFamily="Poppins"
        w="100%"
      >
        Edit Profile
      </Text>
      <Grid
        templateColumns={{ base: "1fr", sm: "1fr", md: "1fr 1fr" }}
        gap={{ base: 3, sm: 4, md: 5, lg: 6 }}
        w="100%"
      >
        {[
          { label: "First Name", field: "FirstName" },
          { label: "Last Name", field: "LastName" },
          { label: "Email", field: "Email" },
          { label: "Shipping Address", field: "ShippingAddress" },
        ].map(({ label, field }, index) => (
          <FormControl key={index}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>{label}</FormLabel>
            <Input
              borderRadius="md"
              size={{ base: "md", md: "md" }}
              value={
                field === "ShippingAddress"
                  ? formData.ShippingAddress.country
                  : (formData as any)[field]
              }
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          </FormControl>
        ))}
      </Grid>
      <Button
        bg="#FF5733"
        color="white"
        height={{ base: "50px", sm: "55px", md: "60px", lg: "65px" }}
        width={{ base: "80%", sm: "70%", md: "60%", lg: "45%" }}
        mt={{ base: 4, sm: 6, md: 7, lg: 8 }}
        rounded="full"
        fontSize={{ base: "sm", md: "md" }}
        onClick={handleSaveChanges}
        isLoading={loading}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileDetailsForm;
