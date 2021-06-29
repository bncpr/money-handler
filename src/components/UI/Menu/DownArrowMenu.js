import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Portal,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

export const DownArrowMenu = ({ children, size, ...rest }) => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        icon={<ChevronDownIcon />}
        variant='ghost'
        size={size}
        _focus={{ boxShadow: "none" }}
        {...rest}
      />
      <Portal>
        <MenuList>{children}</MenuList>
      </Portal>
    </Menu>
  )
}
