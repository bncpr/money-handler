import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { useRef } from "react"

export const AlertYesNo = ({ onClose, isOpen, onYes, header, body }) => {
  const focusRef = useRef()
  return (
    <AlertDialog
      leastDestructiveRef={focusRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      isLazy
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {header}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={focusRef}
            onClick={onClose}
            _focus={{ boxShadow: "outline" }}
          >
            No
          </Button>
          <Button
            colorScheme='red'
            ml={3}
            onClick={() => {
              onYes()
            }}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
