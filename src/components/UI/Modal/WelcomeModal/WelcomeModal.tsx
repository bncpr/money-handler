import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useRef } from "react"

export const WelcomeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const ref = useRef(null)
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={ref}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Welcome to My Expenses Handling App!</ModalHeader>
        <ModalBody as={VStack} fontSize='lg' px={8}>
          <Text>
            I built this app because I was tired of handling my household
            expenses with a spreadsheet&mdash;uncomfortable filtering and
            sorting; having to calculate who owes how much to whom at the end of
            every month with the same simple formula that is way to complicated
            to apply. I wanted to automate it and have nicer visuals along the
            way.
          </Text>
          <Text>
            I've loaded random data for you to play around with. When you're
            done, you can create an account and load it with real data.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button ref={ref} onClick={onClose} colorScheme='green'>
            OKAY
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
