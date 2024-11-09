// SortModal.js

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    useDisclosure,
  } from "@chakra-ui/react";
  
  const SortModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="gray" size="lg">
          Sort By
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Button variant="outline" onClick={() => {/* Sorting logic */}}>Alphabetical</Button>
                <Button variant="outline" onClick={() => {/* Sorting logic */}}>Date</Button>
                <Button variant="outline" onClick={() => {/* Sorting logic */}}>Highest</Button>
                <Button variant="outline" onClick={() => {/* Sorting logic */}}>Lowest</Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SortModal;
  