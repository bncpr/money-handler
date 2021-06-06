import { VStack } from "@chakra-ui/layout"

export const PermanentDrawerContent = ({ children, ...rest }) => {
  return (
    <VStack align='flex-start' spacing={3} p={9} {...rest}>
      {children}
    </VStack>
  )
}
