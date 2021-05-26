import { Input } from "@chakra-ui/react"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const InputContext = ({ field, form, type }) => {
  return (
    <FormControlContext field={field} form={form}>
      <Input {...field} type={type} />
    </FormControlContext>
  )
}
