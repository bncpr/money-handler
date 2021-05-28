import { FormLabel } from "@chakra-ui/form-control"
import { Wrap } from "@chakra-ui/layout"
import { useRadioGroup } from "@chakra-ui/radio"
import { capitalizeFirstChar } from "../../../../utility/utility"
import { RadioCard } from "./RadioCard"
import { PopoverForm } from "../PopoverForm/PopoverForm"
import { PopoverFormContainer } from "../../../../containers/PopoverFormContainer/PopoverFormContainer"

export function CustomRadioGroup({ field, form, options }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: field.name,
    defaultValue: field.value,
    onChange: val => form.setFieldValue(field.name, val),
  })
  const group = getRootProps()

  return (
    <>
      <FormLabel mt={2}>{capitalizeFirstChar(field.name)}</FormLabel>
      <Wrap {...group}>
        {options.map(value => {
          const radio = getRadioProps({ value })

          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
        <PopoverFormContainer name={field.name} component={PopoverForm} />
      </Wrap>
    </>
  )
}
