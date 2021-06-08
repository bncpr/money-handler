import { FormLabel } from "@chakra-ui/form-control"
import { VStack } from "@chakra-ui/layout"
import { RadioGroup } from "@chakra-ui/radio"

export const ControlledRadioGroup = ({ children, onChange, value, label }) => {
  return (
    <RadioGroup onChange={onChange} value={value} size='lg'>
      <FormLabel fontSize='xl'>{label}</FormLabel>
      <VStack align='flex-start' px={3}>
        {children}
      </VStack>
    </RadioGroup>
  )
}
