import { Box } from "@chakra-ui/react"

export const CardBox = ({ children, ...rest }: any) => {
  return (
    <Box shadow='base' bg='white' rounded='md' {...rest}>
      {children}
    </Box>
  )
}
