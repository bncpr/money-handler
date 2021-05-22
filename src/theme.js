import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export const customTheme = extendTheme(

  withDefaultColorScheme({
    colorScheme: "green",
    components: ["Select", "Switch", "Radio"],
  })
)
