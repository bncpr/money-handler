import { Icon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"

const Back = <Icon as={AiFillCaretLeft} />
const Forward = <Icon as={AiFillCaretRight} />

export const BackButton = ({
  onDec,
  isDisabledDec,
}: {
  onDec: () => void
  isDisabledDec: boolean
}) => {
  return (
    <IconButton
      aria-label='back'
      icon={Back}
      variant='ghost'
      fontSize={30}
      onClick={onDec}
      isDisabled={isDisabledDec}
      size='sm'
    />
  )
}

export const ForwardButton = ({
  onInc,
  isDisabledInc,
}: {
  onInc: () => void
  isDisabledInc: boolean
}) => {
  return (
    <IconButton
      aria-label='forward'
      icon={Forward}
      variant='ghost'
      fontSize={30}
      onClick={onInc}
      isDisabled={isDisabledInc}
      size='sm'
    />
  )
}
