import { Button, IconButton } from "@chakra-ui/button"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { Code } from "@chakra-ui/layout"
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/popover"
import { useSelector } from "react-redux"
import { auth } from "../../../firebase"

export const ProfilePopover = ({ ...rest }) => {
  const email = useSelector(state => state.authentication.email)
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
        <PopoverBody>
          Signed in as:
          <Code m={2} p={1}>
            {email}
          </Code>
        </PopoverBody>
        <PopoverFooter display='flex'>
          <Button size='sm' colorScheme='red' onClick={() => auth.signOut()}>
            Log Out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
