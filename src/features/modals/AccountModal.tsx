// AccountModal.tsx
import { 
    Flex, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalBody, 
    ModalCloseButton, 
    Text 
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { BsPerson, BsCardList, BsHeart, BsTelephone, BsBoxArrowRight } from "react-icons/bs";
  import { IconType } from "react-icons";
  
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
  
  const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
    // List of menu items to be displayed in the modal
    const menuItems: MenuItem[] = [
      { icon: BsPerson, label: "Profile", route: "/profile" },
      { icon: BsCardList, label: "Orders", route: "/my-orders" },
      { icon: BsHeart, label: "Wishlist", route: "/wishlist" },
      { icon: BsTelephone, label: "Contact Us", route: "/contact" },
      { icon: BsBoxArrowRight, label: "Log Out", route: "/" },
    ];
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="200px" mt="40px" position="absolute" top="50px" right="20px">
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap={4}>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.route}>
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
  
  export default AccountModal;
  