import { StackItem } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const NavigationItem = ({ path, current, label, ...rest }: any) => {
  const isSelected = current === path
  return (
    <StackItem
      display='flex'
      fontWeight='700'
      fontSize={["md", "lg", "xl"]}
      color={isSelected ? "purple.500" : "white"}
      _hover={{ color: isSelected ? "purple.400" : "gray.200" }}
      bgColor={isSelected ? "white" : ""}
      shadow={isSelected ? "md" : ""}
      height='full'
      py={2}
      px={3}
      {...rest}
    >
      <Box as={Link} to={path} my='auto'>
        {label}
      </Box>
    </StackItem>
  )
}
