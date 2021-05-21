import { StackItem } from "@chakra-ui/layout"
import { Link } from "react-router-dom"

export const NavigationItem = ({ children, path }) => {
  return (
    <StackItem
      p='1.5'
      fontSize='lg'
      fontWeight='700'
      color='white'>
      <Link to={path}>{children}</Link>
    </StackItem>
  )
}
