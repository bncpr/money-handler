import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { capitalizeFirstChar } from "../../../../utility/utility"

export const FormControlContext = ({ field, form, children }) => {
  const name = field.name
  return (
    <FormControl
      id={name}
      isInvalid={form.errors[name] && form.touched[name]}
    >
      <FormLabel htmlFor={name}>{capitalizeFirstChar(name)}</FormLabel>
      {children}
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  )
}
