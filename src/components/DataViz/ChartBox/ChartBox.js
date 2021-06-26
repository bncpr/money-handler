import { Box } from "@chakra-ui/layout"

export const ChartBox = ({ children, h, w, ml = 0, mt = 0, ...rest }) => {
  return (
    <Box
      as='svg'
      h={h}
      w={w}
      shadow='base'
      rounded='md'
      bg="white"
      {...rest}
    >
      <g transform={`translate(${ml},${mt})`}>{children}</g>
    </Box>
  )
}
