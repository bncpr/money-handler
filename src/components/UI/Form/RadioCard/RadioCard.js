import { Box } from "@chakra-ui/layout"
import { useRadio } from "@chakra-ui/radio"
import { Tag, TagLabel } from "@chakra-ui/tag"
import { capitalizeFirstChar } from "../../../../utility/utility"

export function RadioCard({ children, label, ...rest }) {
  const { getInputProps, getCheckboxProps } = useRadio(rest)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Tag
        {...checkbox}
        variant='outline'
        fontWeight='normal'
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        size='lg'
        _checked={{
          bg: "purple.500",
          color: "white",
          borderColor: "purple.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={2}
      >
        {<TagLabel>{capitalizeFirstChar(label)}</TagLabel>}
        {children}
      </Tag>
    </Box>
  )
}
