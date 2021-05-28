import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"

export const FormControlContext = ({ field, form, children, label, ...rest }) => {
  const name = field.name
  return (
    <FormControl
      id={name}
      isInvalid={form.errors[name] && form.touched[name]}
      width='max'
      {...rest}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  )
}
