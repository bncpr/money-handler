import { Button, IconButton } from "@chakra-ui/button"
import { TriangleDownIcon } from "@chakra-ui/icons"
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/popover"

export const ProfilePopover = ({ children, onClick, ...rest }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          icon={<TriangleDownIcon />}
          _focus={{ boxShadow: "none" }}
          {...rest}
        />
      </PopoverTrigger>

      <PopoverContent p={3} _focus={{ boxShadow: "none" }}>
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
        <PopoverFooter display='flex'>
          <Button size='sm' colorScheme='red' onClick={onClick}>
            Log Out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
