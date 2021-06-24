import { Stack } from "@chakra-ui/layout"
import { forwardRef } from "react"

export const Toolbar = forwardRef(({ children, ...rest }, ref) => {
  return (
    <Stack
      direction={["column", "row"]}
      pos='fixed'
      top={0}
      left={0}
      w='full'
      h='min'
      zIndex={1300}
      align='center'
      {...rest}
      ref={ref}
    >
      {children}
    </Stack>
  )
})
