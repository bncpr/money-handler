import { NumberInputComp } from "../NumberInputComp/NumberInputComp"
import { FormControlContext } from "../FormControlContext/FormControlContext"

export const NumberInputContext = ({ field, form, ...rest }: any) => {
  const name = field.name
  return (
    <FormControlContext field={field} form={form} {...rest}>
      <NumberInputComp
        {...field}
        onChange={(val: number) => form.setFieldValue(name, +val)}
        min={0}
        width='max'
      />
    </FormControlContext>
  )
}
