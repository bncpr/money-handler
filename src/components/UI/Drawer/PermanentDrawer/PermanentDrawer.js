import { Flex, VStack } from "@chakra-ui/layout"
import { Slide } from "@chakra-ui/react"
import { forwardRef } from "react"

export const PermanentDrawer = forwardRef(
  ({ children, isOpen, ...rest }, ref) => {
    return (
      <Slide direction='left' in={isOpen}>
        <Flex
          direction='column'
          position='fixed'
          left='0'
          bottom='0'
          boxShadow='2xl'
          {...rest}
          ref={ref}
        >
          {children}
        </Flex>
      </Slide>
    )
  },
)
