import { Box } from "@chakra-ui/layout"

export const ChartBox = ({ children, h, w, ml = 0, mt = 0, ...rest }) => {
  return (
    <Box
      as='svg'
      h={h}
      w={w}
      shadow='2xl'
      borderRadius='xl'
      bgColor='gray.50'
      {...rest}
    >
      <g transform={`translate(${ml},${mt})`}>{children}</g>
    </Box>
  )
}
