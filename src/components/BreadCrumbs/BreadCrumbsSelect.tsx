import { ChevronRightIcon } from "@chakra-ui/icons"
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react"
import { monthsMapFull } from "../../utility/maps"

export const BreadCrumbsSelect = ({
  view,
  value,
  label,
  field = [],
  onChange,
}: any) => {
  return (
    <HStack spacing={1}>
      <ChevronRightIcon
        h={7}
        w={7}
        // opacity={view !== value && "0.3"}
      />
      <Menu>
        {({ onClose }) => (
          <>
            <MenuButton
              as={Button}
              size='md'
              variant='solid'
              fontSize='xl'
              // opacity={view !== value && "0.3"}
            >
              {value === "month" ? monthsMapFull.get(label) : label}
            </MenuButton>

            <MenuList>
              <MenuOptionGroup value={label} onChange={onChange}>
                {field.map((val: string) => (
                  <MenuItemOption key={val} value={val} onClick={onClose}>
                    {value === "month" ? monthsMapFull.get(val) : val}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </HStack>
  )
}
