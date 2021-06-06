import { StackItem } from "@chakra-ui/layout"
import { Link } from "react-router-dom"

export const NavigationItem = ({ children, path, current, ...rest }) => {
  return (
    <StackItem
      fontSize='xl'
      fontWeight='700'
      color='white'
      _hover={{ color: "gray.200" }}
      bgColor={current === path && "purple.400"}
      py={2}
      px={3}
      borderRadius='md'
      {...rest}
    >
      <Link to={path}>{children}</Link>
    </StackItem>
  )
}
