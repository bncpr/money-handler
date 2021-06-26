import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react"

export const customTheme = extendTheme(
  {
    styles: {
      global: {
        "html, body": {
          bg: "gray.50",
        },
      },
    },
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
  withDefaultProps({
    defaultProps: {
      isLazy: true,
    },
    components: ["Menu"],
  }),
  withDefaultProps({
    defaultProps: {
      overflow: "visible",
    },
    components: ["TagLabel"],
  }),
)
