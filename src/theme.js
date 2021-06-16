import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react"

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
      Radio: {
        baseStyle: {
          container: {
            cursor: "pointer",
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "green",
    components: ["Radio"],
  }),
  withDefaultProps({
    defaultProps: {
      isLazy: true,
    },
    components: ["Menu"],
  }),
)
