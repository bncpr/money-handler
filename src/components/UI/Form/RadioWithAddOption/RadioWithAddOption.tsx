import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control"
import { Wrap } from "@chakra-ui/layout"
import { useRadioGroup } from "@chakra-ui/radio"
import { TagCloseButton } from "@chakra-ui/tag"
import { PopoverFormContainer } from "../../../../containers/PopoverFormContainer/PopoverFormContainer"
import { capitalizeFirstChar } from "../../../../utility/utility"
import { RadioCard } from "../RadioCard/RadioCard"

export const RadioWithAddOption = ({
  field: { name, value },
  form,
  options,
  addedFields,
  portalRef,
  onAddField,
  onRemoveAddedField,
}: any) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange: val => form.setFieldValue(name, val),
  })
  const group = getRootProps()
  const onRemove = (val: string) => () => onRemoveAddedField(name, val)

  return (
    <FormControl isInvalid={form.errors[name] && form.touched[name]}>
      <FormLabel mt={2}>{capitalizeFirstChar(name)}</FormLabel>
      <Wrap {...group}>
        {options.map((val: string) => {
          const radio = getRadioProps({ value: val })
          return <RadioCard key={val} label={val} {...radio} />
        })}
        {addedFields.map((val: string) => {
          const radio = getRadioProps({ value: val })
          return (
            <RadioCard key={val} label={val} {...radio}>
              <TagCloseButton
                onClick={onRemove(val)}
                _focus={{ boxShadow: "none" }}
              />
            </RadioCard>
          )
        })}

        <PopoverFormContainer
          name={name}
          options={options}
          addedFields={addedFields}
          portalRef={portalRef}
          onAddField={onAddField}
        />
      </Wrap>
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  )
}
