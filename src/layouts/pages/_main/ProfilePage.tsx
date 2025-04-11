import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ProfileHeader from "../_subpages/ProfileHeader";
import ProfileInfoBox from "../_subpages/ProfileInfoBox";
import HelpCenter from "../_subpages/HelpCenter";
import ProfileDetailsForm from "../_subpages/ProfileDetailsForm";

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState("Edit Profile");

  return (
    <Box mt={{ base: "120px", sm: "120px", md: "150px" }}>
      <ProfileHeader />
      <Flex
        direction={{ base: "column", md: "row" }}
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 4, sm: 5, md: 6 }}
        gap={{ base: 4, sm: 5, md: 6 }}
        maxW="container.xl"
        mx="auto"
      >
        <ProfileInfoBox onSelectOption={setSelectedOption} />
        <Box flex={1}>
          {selectedOption === "Help Center" ? (
            <HelpCenter />
          ) : (
            <ProfileDetailsForm />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
