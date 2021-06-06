import { Box, Wrap } from "@chakra-ui/layout"
import { capitalizeFirstChar } from "../../../utility/utility"

export const Legend = ({ array, colors, ...rest }) => {
  return (
    <Wrap {...rest}>
      {array.map(value => (
        <Box
          as='span'
          _before={{
            display: "inline-block",
            position: "relative",
            content: `""`,
            top: "25%",
            bg: colors?.[value],
            w: "1em",
            h: "1em",
            m: "5px",
            borderRadius: "50%",
          }}
        >
          {capitalizeFirstChar(value)}
        </Box>
      ))}
    </Wrap>
  )
}
