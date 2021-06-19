import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle, Flex,
  Modal, ModalCloseButton,
  ModalContent, ModalOverlay
} from "@chakra-ui/react";

export const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Alert status='error' borderRadius='md' bg='white'>
          <AlertIcon />
          <Flex direction='column'>
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Flex>
          <ModalCloseButton position='absolute' right='8px' top='8px' />
        </Alert>
      </ModalContent>
    </Modal>
  );
};
