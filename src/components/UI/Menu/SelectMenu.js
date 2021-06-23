import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react"
import { monthsMapFull } from "../../../utility/maps"
import { capitalizeFirstChar } from "../../../utility/utility"

export const SelectMenu = ({
  buttonVal,
  buttonDefault,
  array = [],
  onChange,
  counts,
  ...rest
}) => (
  <Menu isLazy>
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
            ? monthsMapFull.get(buttonVal)
            : capitalizeFirstChar(buttonVal)) || buttonDefault}
        </MenuButton>
        <MenuList maxH={96} overflow='auto'>
          <MenuOptionGroup value={buttonVal} onChange={onChange} type='radio'>
            {array.map(([a, b]) => (
              <MenuItemOption
                key={a}
                value={a}
                onClick={() => {
                  setTimeout(() => onClose(), 0)
                }}
              >
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
