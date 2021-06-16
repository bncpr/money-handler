import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react"
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"

export const MenuEditDelete = ({ id, onDelete, onEdit }) => (
  <Menu isLazy>
    <MenuButton
      as={IconButton}
      icon={<ChevronDownIcon />}
      variant='unstyled'
      size='1xs'
      _focus={{ boxShadow: "none" }}
    />
    <MenuList>
      <MenuItem icon={<EditIcon />} value={id} onClick={onEdit}>
        Edit
      </MenuItem>
      <MenuItem icon={<DeleteIcon />} value={id} onClick={onDelete}>
        Delete
      </MenuItem>
    </MenuList>
  </Menu>
)
