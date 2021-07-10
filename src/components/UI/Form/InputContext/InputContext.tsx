import { Input } from "@chakra-ui/react"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const InputContext = ({
  children,
  field,
  type,
  initialFocusRef,
  ...rest
}: any) => {
  return (
    <FormControlContext field={field} {...rest}>
      <Input {...field} type={type} ref={initialFocusRef} />
      {children}
    </FormControlContext>
  )
}
