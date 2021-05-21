
import { Box } from "@chakra-ui/layout"

export const Toolbar = ({ children }) => {
  return (
    <Box as='header' w='full' h='min' bgColor='green.400' pos='fixed' zIndex={1}>
      <Box as='nav' h='full'>
        {children}
      </Box>
    </Box>
  )
}
