import { Box, Flex } from "@chakra-ui/layout"
import { Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export const PermanentDrawer = forwardRef(
  ({ children, isOpen, placement, ...rest }, ref) => {
    return (
        <Box
          position='fixed'
          left={placement === "left" && "0"}
          right={placement === "right" && "0"}
          bottom='0'
          boxShadow='2xl'
          bgColor='white'
          {...rest}
          ref={ref}
        >
          {children}
        </Box>
    )
  },
)
