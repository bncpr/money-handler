import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react"
import * as R from "ramda"
import { useState } from "react"

const clean = R.pipe(
  R.toLower,
  R.split(","),
  R.map(R.pipe(R.trim, R.replace(/ /g, "-"))),
  R.reject(R.isEmpty),
)

export const InputTagsCheckbox = ({ field, form }) => {
  const unselectTag = tag => () =>
    form.setFieldValue(field.name, R.reject(R.equals(tag), field.value))
  const [input, setInput] = useState("")
  const [error, setError] = useState(null)
  const validate = cleaned => {
    console.log(cleaned)
    if (
      R.any(R.includes(R.__, field.value), cleaned) ||
      R.any(R.gt(R.__, 1), R.values(R.countBy(R.identity, cleaned)))
    ) {
      return "no duplicates"
    } else if (cleaned.some(str => str.length > 15)) {
      return "tag must be shorter than 15 characters"
    }
  }
  const handleSubmit = () => {
    const cleaned = clean(input)
    const error = validate(cleaned)
    if (error) {
      return setError(error)
    }
    form.setFieldValue(field.name, field.value.concat(cleaned))
    setInput("")
    setError()
  }

  return (
    <FormControl id='tags' isInvalid={error || form.errors.tags}>
      <FormLabel htmlFor='tags' mt={3}>
        Tags
      </FormLabel>
      {!R.isEmpty(field.value) && (
        <Wrap p={2}>
          {field.value.map(tag => (
            <Tag key={tag} colorScheme='purple' variant='solid'>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton
                onClick={unselectTag(tag)}
                _focus={{ boxShadow: "none" }}
              />
            </Tag>
          ))}
        </Wrap>
      )}
      <Wrap py={2}>
        <Input
          mt={3}
          width='max'
          value={input}
          onChange={e => {
            setInput(e.target.value)
            setError()
          }}
          onKeyPress={e => e.key === "Enter" && handleSubmit()}
        />
        <Button
          onClick={handleSubmit}
          isDisabled={input === ""}
          variant='solid'
          colorScheme='green'
        >
          ADD
        </Button>
      </Wrap>
      <FormErrorMessage>{error || form.errors.tags}</FormErrorMessage>
      <FormHelperText>comma separated tags</FormHelperText>
    </FormControl>
  )
}
