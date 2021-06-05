import { StackItem } from "@chakra-ui/layout"
import { Link } from "react-router-dom"

export const NavigationItem = ({ children, path, ...rest }) => {
  return (
    <StackItem
      fontSize='xl'
      fontWeight='700'
      color='white'
      _hover={{ color: "gray.200" }}
      {...rest}
    >
      <Link to={path}>{children}</Link>
    </StackItem>
  )
}
