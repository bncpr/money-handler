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
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { auth } from "../../../api/firebase/firebase"
import { useAppSelector } from "../../../hooks/reduxTypedHooks/reduxTypedHooks"

export const ProfilePopover = ({ ...rest }) => {
  const history = useHistory()
  const email = useAppSelector(state => state.authentication.email)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label='profile'
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
          <Button
            size='sm'
            colorScheme='red'
            onClick={() => {
              setIsLoading(true)
              auth.signOut()
              history.push("/")
            }}
            isLoading={isLoading}
          >
            Log Out
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
