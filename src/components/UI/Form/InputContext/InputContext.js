import { DeleteIcon } from "@chakra-ui/icons"
import { Input, InputRightAddon } from "@chakra-ui/react"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const InputContext = ({
  children,
  field,
  type,
  initialFocusRef,
  ...rest
}) => {
  return (
    <FormControlContext field={field} {...rest}>
      <Input {...field} type={type} ref={initialFocusRef} />
      {children}
    </FormControlContext>
  )
}
