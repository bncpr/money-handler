import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export const customTheme = extendTheme(
  {
    fonts: {
      body: "Poppins, sans-serif"
    }
  },
  withDefaultColorScheme({
    colorScheme: "green",
    components: ["Select", "Switch", "Radio"],
  })
)
