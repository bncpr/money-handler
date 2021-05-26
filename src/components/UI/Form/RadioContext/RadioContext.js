import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Wrap,
} from "@chakra-ui/react"
import { capitalizeFirstChar } from "../../../../utility/utility"

export const RadioContext = ({ field, options }) => {
  const { name, onChange, ...rest } = field
  return (
    <FormControl id={name} name={name}>
      <FormLabel htmlFor={name} mt={2}>
        {capitalizeFirstChar(name)}
      </FormLabel>
      <RadioGroup {...rest} name={name}>
        <Wrap>
          {options.map(option => (
            <Radio key={option} value={option} onChange={onChange}>
              {option}
            </Radio>
          ))}
        </Wrap>
      </RadioGroup>
    </FormControl>
  )
}
