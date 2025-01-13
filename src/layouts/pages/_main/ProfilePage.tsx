import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ProfileHeader from "../_subpages/ProfileHeader";
import ProfileInfoBox from "../_subpages/ProfileInfoBox";
import HelpCenter from "../_subpages/HelpCenter";
import ProfileDetailsForm from "../_subpages/ProfileDetailsForm";


const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState("Edit Profile");

  return (
    <Box mt="200px">
      <ProfileHeader />
      <Flex direction={{ base: "column", md: "row" }} px={8} py={6} gap={6}>
        <ProfileInfoBox onSelectOption={setSelectedOption} />
        {selectedOption === "Help Center" ? <HelpCenter /> : <ProfileDetailsForm />}
      </Flex>
    </Box>
  );
};

export default ProfilePage;



