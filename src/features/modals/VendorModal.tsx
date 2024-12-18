// AccountModal.tsx
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  BsPerson,
  BsCardList,
  BsHeart,
  BsTelephone,
  BsBoxArrowRight,
} from "react-icons/bs";
import { IconType } from "react-icons";
import { useAuth } from "../../layouts/hooks/useAuth";

// Define prop types
interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu item type definition for better scalability
interface MenuItem {
  icon: IconType;
  label: string;
  route: string;
}

const VendorModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { vendorLogout } = useAuth();
  const toast = useToast();

  const menuItems: MenuItem[] = [
    { icon: BsPerson, label: "Profile", route: "/vendor-profile" },
    { icon: BsCardList, label: "Orders", route: "/vendor-orders" },
    { icon: BsHeart, label: "Wishlist", route: "/wishlist" },
    { icon: BsTelephone, label: "Contact Us", route: "/contact" },
    { icon: BsBoxArrowRight, label: "Log Out", route: "" },
  ];

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.label === "Log Out") {
      vendorLogout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="200px"
        mt="40px"
        position="absolute"
        top="50px"
        right="20px"
      >
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap={4}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.route}
                onClick={(e) => {
                  if (item.label === "Log Out") {
                    e.preventDefault();
                  }
                  handleMenuItemClick(item);
                }}
              >
                <Flex alignItems="center" gap={2} _hover={{ color: "#FF5733" }}>
                  <item.icon /> <Text>{item.label}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VendorModal;
