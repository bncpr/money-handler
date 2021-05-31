import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { capitalizeFirstChar } from "../../../utility/utility"

export const SelectMenu = ({
  style,
  buttonVal,
  buttonDefault,
  array,
  onChange,
}) => (
  <Menu>
    {({ onClose }) => (
      <>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          {...style}
          fontWeight={buttonVal ? "bold" : "normal"}
          variant={buttonVal ? "solid" : "ghost"}
        >
          {buttonVal || buttonDefault}
        </MenuButton>
        <MenuList maxH={96} overflow='auto'>
          <MenuOptionGroup
            value={buttonVal}
            onChange={onChange}
            type='radio'
          >
            {array.map(([a, b]) => (
              <MenuItemOption key={a} value={a} onClick={onClose}>
                {capitalizeFirstChar(b)}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </>
    )}
  </Menu>
)
