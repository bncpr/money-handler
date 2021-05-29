import { Box } from "@chakra-ui/layout"
import { useRadio } from "@chakra-ui/radio"
import { Tag } from "@chakra-ui/tag"

export function RadioCard({ children, ...rest }) {
  const { getInputProps, getCheckboxProps } = useRadio(rest)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Tag
        {...checkbox}
        variant="outline"
        fontWeight="normal"
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow="md"
        size="lg"
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
        {children}
      </Tag>
    </Box>
  )
}
