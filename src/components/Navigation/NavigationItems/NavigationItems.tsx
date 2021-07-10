import { Spacer } from "@chakra-ui/layout"
import { Icon, LinkBox, LinkOverlay, Tooltip } from "@chakra-ui/react"
import { GoMarkGithub } from "react-icons/go"
import { ProfilePopover } from "../../Profile/ProfilePopover/ProfilePopover"
import { NavigationItem } from "./NavigationItem/NavigationItem"

export const NavigationItems = ({
  signedIn,
  pathname,
}: {
  signedIn: boolean
  pathname: string
}) => {
  return (
    <>
      <NavigationItem path='/' current={pathname} label='HOME' ml={3} />
      <NavigationItem path='/entries' current={pathname} label='ENTRIES' />
      <NavigationItem path='/about' current={pathname} label='ABOUT' />
      <Spacer />
      {signedIn !== undefined && (
        <Tooltip label='Go to GitHub repository'>
          <LinkBox>
            <Icon as={GoMarkGithub} h={6} w={6} color='white' />
            <LinkOverlay
              href='https://github.com/bncpr/money-handler'
              target='_blank'
              rel='noreferrer noopener'
            />
          </LinkBox>
        </Tooltip>
      )}
      {signedIn ? (
        <ProfilePopover
          variant='subtle'
          colorScheme='purple'
          color='purple.800'
        />
      ) : (
        signedIn !== undefined && (
          <NavigationItem
            path='/login'
            current={pathname}
            label='LOGIN'
            px={6}
          />
        )
      )}
    </>
  )
}
