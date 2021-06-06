import { Flex } from "@chakra-ui/layout"
import { forwardRef } from "react"

export const PermanentDrawer = forwardRef(
  ({ children, isOpen, ...rest }, ref) => {
    return (
      <Flex
        direction='column'
        position='fixed'
        left='0'
        bottom='0'
        boxShadow='2xl'
        bgColor='white'
        {...rest}
        ref={ref}
      >
        {children}
      </Flex>
    )
  },
)
