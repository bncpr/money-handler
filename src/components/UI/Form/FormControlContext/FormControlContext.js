import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react"

export const FormControlContext = ({
  field: { name },
  form,
  children,
  label,
  helperText,
}) => {
  return (
    <FormControl
      id={name}
      isInvalid={form.errors[name] && form.touched[name]}
      width='max'
    >
      <FormLabel htmlFor={name} mt={3}>
        {label}
      </FormLabel>
      {children}
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  )
}
