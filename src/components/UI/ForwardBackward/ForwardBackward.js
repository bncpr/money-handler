import { ChevronLeftIcon, ChevronRightIcon, Icon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"

const Back = <Icon as={AiFillCaretLeft} />
const Forward = <Icon as={AiFillCaretRight} />

export const ForwardBackward = ({
  onDec,
  onInc,
  isDisabledInc,
  isDisabledDec,
}) => {
  return (
    <>
      <IconButton
        icon={Back}
        variant='ghost'
        fontSize={30}
        onClick={onDec}
        isDisabled={isDisabledDec}
      />
      <IconButton
        icon={Forward}
        variant='ghost'
        fontSize={30}
        onClick={onInc}
        isDisabled={isDisabledInc}
      />
    </>
  )
}
