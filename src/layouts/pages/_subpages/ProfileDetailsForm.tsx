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
      p={12}
      bg="white"
      borderRadius="lg"
      width={{ base: "100%", md: "100%" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text
        color="#FF5733"
        fontWeight="bold"
        textAlign="left"
        fontSize="17px"
        mb={4}
        textDecoration="underline"
        fontFamily="Poppins"
      >
        Edit Profile
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        {[
          { label: "First Name", field: "FirstName" },
          { label: "Last Name", field: "LastName" },
          { label: "Email", field: "Email" },
          { label: "Shipping Address", field: "ShippingAddress" },
        ].map(({ label, field }, index) => (
          <FormControl key={index}>
            <FormLabel>{label}</FormLabel>
            <Input
              borderRadius="md"
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
        height="65px"
        width="45%"
        mt={8}
        rounded="full"
        onClick={handleSaveChanges}
        isLoading={loading}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfileDetailsForm;
