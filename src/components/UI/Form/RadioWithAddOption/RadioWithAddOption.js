import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control"
import { Wrap } from "@chakra-ui/layout"
import { useRadioGroup } from "@chakra-ui/radio"
import { capitalizeFirstChar } from "../../../../utility/utility"
import { PopoverForm } from "../PopoverForm/PopoverForm"
import { PopoverFormContainer } from "../../../../containers/PopoverFormContainer/PopoverFormContainer"
import * as R from "ramda"
import { TagCloseButton, TagLabel } from "@chakra-ui/tag"

export const RadioWithAddOption = ({
  field: { name, value },
  radioComp: RadioComp,
  form,
  options,
  addedFields,
  portalRef,
  onAddField,
  onRemoveAddedField,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    onChange: val => form.setFieldValue(name, val),
  })
  const group = getRootProps()
  const onRemove = val => () => onRemoveAddedField(name, val)

  return (
    <FormControl isInvalid={form.errors[name] && form.touched[name]}>
      <FormLabel mt={2}>{capitalizeFirstChar(name)}</FormLabel>
      <Wrap {...group}>
        {options.map(val => {
          const radio = getRadioProps({ value: val })
          return <RadioComp key={val} label={val} {...radio} />
        })}
        {addedFields.map(val => {
          const radio = getRadioProps({ value: val })
          return (
            <RadioComp key={val} label={val} {...radio}>
              <TagCloseButton
                onClick={onRemove(val)}
                _focus={{ boxShadow: "none" }}
              />
            </RadioComp>
          )
        })}

        <PopoverFormContainer
          name={name}
          component={PopoverForm}
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
