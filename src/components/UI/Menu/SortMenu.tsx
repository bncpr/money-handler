import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Portal,
} from "@chakra-ui/react"
import { BiSortDown, BiSortUp } from "react-icons/bi"
import { SortValue } from "../../../types/SortValue"

export const SortMenu = ({
  value,
  onChange,
}: {
  value: SortValue
  onChange: (s: string | string[]) => void
}) => {
  return (
    <Menu isLazy={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            as={IconButton}
            icon={
              value === "descend" ? (
                <Icon as={BiSortDown} w={5} h={5} />
              ) : value === "ascend" ? (
                <Icon as={BiSortUp} w={5} h={5} />
              ) : (
                <ChevronDownIcon />
              )
            }
            variant='ghost'
            size='2xs'
            ml={1}
            _focus={{ boxShadow: "none" }}
          />
          <Portal>
            <MenuList>
              <MenuOptionGroup
                type='radio'
                title='Sort'
                value={value}
                onChange={onChange}
              >
                {value && (
                  <MenuItemOption value='' onClick={onClose}>
                    None
                  </MenuItemOption>
                )}
                <MenuItemOption value='ascend' onClick={onClose}>
                  Ascending
                </MenuItemOption>
                <MenuItemOption value='descend' onClick={onClose}>
                  Descending
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  )
}
