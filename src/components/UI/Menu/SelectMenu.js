import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

export const SelectMenu = ({
  style,
  buttonVal,
  buttonDef,
  array,
  onChange,
}) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} {...style}>
      {buttonVal || buttonDef}
    </MenuButton>
    <MenuList maxH={96} overflow='auto'>
      <MenuOptionGroup value={buttonVal} onChange={onChange} type='radio'>
        {array.map(([a, b]) => (
          <MenuItemOption key={a} value={a}>
            {b}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </MenuList>
  </Menu>
)
