import {
  Button, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const NoEntriesModal = ({ isOpen }) => {
  const history = useHistory();
  const redirectToEntries = () => history.push("/entries");
  return (
    <Modal isOpen={isOpen} onClose={redirectToEntries}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>No Entries Yet</ModalHeader>
        <ModalBody>
          <Text>You need to have data in order to viz it.</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' onClick={redirectToEntries}>
            Okay
          </Button>
        </ModalFooter>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
