import { Input } from "@chakra-ui/react"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const InputContext = ({ children, field, type, ...rest }) => {
  return (
    <FormControlContext field={field} {...rest}>
      <Input {...field} type={type} />
      {children}
    </FormControlContext>
  )
}
