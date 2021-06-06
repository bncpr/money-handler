import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  Badge,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { capitalizeFirstChar } from "../../../utility/utility"
import { monthsMap } from "../../../utility/maps"

export const SelectMenu = ({
  buttonVal,
  buttonDefault,
  array,
  onChange,
  counts,
  ...rest
}) => (
  <Menu>
    {({ onClose }) => (
      <>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          fontWeight={buttonVal ? "bold" : "normal"}
          variant={buttonVal ? "solid" : "ghost"}
          {...rest}
        >
          {(buttonDefault === "Month"
            ? monthsMap.get(buttonVal)
            : capitalizeFirstChar(buttonVal)) || buttonDefault}
        </MenuButton>
        <MenuList maxH={96} overflow='auto'>
          <MenuOptionGroup value={buttonVal} onChange={onChange} type='radio'>
            {array.map(([a, b]) => (
              <MenuItemOption key={a} value={a} onClick={onClose}>
                {capitalizeFirstChar(b)}
                {counts && (
                  <Badge colorScheme='purple' fontSize='xs' m={2}>
                    {counts[a]}
                  </Badge>
                )}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </>
    )}
  </Menu>
)
