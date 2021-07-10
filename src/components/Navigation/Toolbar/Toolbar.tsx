import { Stack } from "@chakra-ui/layout"

export const Toolbar = ({ children, ...rest }: any) => {
  return (
    <Stack
      direction='row'
      pos='fixed'
      top={0}
      left={0}
      w='full'
      h='46px'
      zIndex={1300}
      align='center'
      {...rest}
    >
      {children}
    </Stack>
  )
}
