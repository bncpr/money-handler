import { IconButton } from "@chakra-ui/button"
import { HamburgerIcon } from "@chakra-ui/icons"

export const ToolbarBurgerButton = ({ onClick, ...rest }) => {
  return (
    <IconButton
      _focus={{ boxShadow: "none" }}
      variant='subtle'
      fontSize='3xl'
      icon={<HamburgerIcon />}
      onClick={onClick}
      {...rest}
    />
  )
}
