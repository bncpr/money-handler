import { Box } from "@chakra-ui/layout"
import { format } from "d3-format"
import { capitalizeFirstChar } from "../../../../utility/utility"

export const Bar = ({ d, hovered, setHovered }) => {
  return (
    <Box
      as='rect'
      {...d}
      onMouseEnter={() => setHovered(d.name)}
      onMouseOut={() => setHovered("")}
      opacity={hovered && hovered !== d.name ? "0.4" : "1"}
      stroke={hovered === d.name ? "black" : ""}
      transition='opacity ease 500ms 100ms'
    >
      <title>{`${capitalizeFirstChar(d.name)}: ${format(",")(d.value)}`}</title>
    </Box>
  )
}
