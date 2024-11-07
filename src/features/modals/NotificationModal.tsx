// src/features/modals/NotificationModal.js
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    VStack,
    Text,
  } from "@chakra-ui/react";
  
  const NotificationModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              {/* Dummy notifications */}
              <Text color="gray.500">New order received!</Text>
              <Text color="gray.500">Your wallet has been credited.</Text>
              <Text color="gray.500">Insight report is available now.</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default NotificationModal;
  