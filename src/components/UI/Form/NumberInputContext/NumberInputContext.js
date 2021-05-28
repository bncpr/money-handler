import { NumberInputComp } from "../NumberInputComp/NumberInputComp"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const NumberInputContext = ({ field, form }) => {
  const name = field.name
  return (
    <FormControlContext field={field} form={form}>
      <NumberInputComp
        {...field}
        onChange={val => form.setFieldValue(name, val)}
        min={0}
        width="max"
      />
    </FormControlContext>
  )
}


