import { extendTheme } from "@chakra-ui/react"

export const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "gray.50",
        // w: "100vw",
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
    Radio: {
      baseStyle: {
        container: {
          cursor: "pointer",
        },
      },
    },
  },
})
