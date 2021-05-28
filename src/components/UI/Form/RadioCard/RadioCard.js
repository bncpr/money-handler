import { Box } from "@chakra-ui/layout"
import { useRadio } from "@chakra-ui/radio"

export function RadioCard({ children, ...rest }) {
  const { getInputProps, getCheckboxProps } = useRadio(rest)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: "green.600",
          color: "white",
          borderColor: "green.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={2}
      >
        {children}
      </Box>
    </Box>
  )
}
