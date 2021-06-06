import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export const customTheme = extendTheme(
  {
    components: {
      Button: {
        baseStyle: {
          _disabled: {
            cursor: "default",
          },
        },
      },
      Switch: {
        baseStyle: {
          track: {
            _focus: {
              boxShadow: "none",
            },
            _disabled: {
              cursor: "default",
            },
          },
        },
      },
      Tabs: {
        baseStyle: {
          tab: {
            _focus: {
              boxShadow: "none",
            },
          },
        },
      },
      Heading: {
        variants: {
          label: { size: "md", fontWeight: "normal" },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "green",
    components: ["Select", "Switch", "Radio"],
  }),
)
