import { Box } from "@chakra-ui/layout"
import {
  Container,
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { FC } from "react"
import { CardBox } from "../UI/Box/CardBox/CardBox"

const Bold: FC = ({ children, ...rest }) => (
  <Text as='span' fontWeight='semibold' {...rest}>
    {children}
  </Text>
)

export const About = () => {
  return (
    <Box pt={6}>
      <Container maxW='container.lg'>
        <CardBox
          mt={9}
          rounded='sm'
          py={9}
          px={12}
          as={VStack}
          align='start'
          spacing={4}
          fontSize='lg'
        >
          <Heading size='lg' ml={9}>
            About
          </Heading>
          <Divider />
          <Text>
            This is an application I built as a first learning project in
            Javascript. The goal was to make my personal spread-sheet, which I
            use to calculate and store our monthly household expenses in, into a
            friendlier user experience when managing the entries, visualizing
            the data, and calculating how much one owes to the other at the end
            of each month.
          </Text>
          <Text>Technologies I used:</Text>
          <UnorderedList px={9} spacing={3}>
            <ListItem>
              <Bold>React</Bold> 17 which I absolutely love, especially with the
              new Hooks-API.
            </ListItem>
            <ListItem>
              <Bold>TypeScript</Bold> for type checking.
            </ListItem>
            <ListItem>
              <Bold>Redux</Bold> for store management with the{" "}
              <Bold>Redux Toolkit</Bold> which made things a whole lot tidier.
            </ListItem>
            <ListItem>
              <Bold>D3.js</Bold> for data visualization.
            </ListItem>
            <ListItem>
              <Bold>Chakra-UI</Bold> for pretty components and easy styling.
            </ListItem>
            <ListItem>
              <Bold>Framer-Motion</Bold> for animations.
            </ListItem>
            <ListItem>
              <Bold>Firebase</Bold> as a back-end (Realtime Database and
              Authentication).
            </ListItem>
            <ListItem>
              <Bold>Formik</Bold> for easy form state management and{" "}
              <Bold>Yup</Bold> for form validation.
            </ListItem>
            <ListItem>
              <Bold>Ramda</Bold> for functional JS.
            </ListItem>
          </UnorderedList>
        </CardBox>
      </Container>
    </Box>
  )
}
