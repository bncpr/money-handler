import { Input } from "@chakra-ui/react"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const InputContext = ({ field, form, type, label, ...rest }) => {
  return (
    <FormControlContext field={field} form={form} label={label} {...rest}>
      <Input {...field} type={type} />
    </FormControlContext>
  )
}
