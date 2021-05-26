import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"

export const NumberInputComp = ({ focus, ...rest }) => {
  return (
    <NumberInput {...rest}>
      <NumberInputField _focus={focus ?? { boxShadow: "outline" }} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
