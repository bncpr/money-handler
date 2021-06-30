import { format } from "d3-format"
import { capitalizeFirstChar } from "../../../../../utility/utility"

export const Bar = ({ d, hovered, setHovered }) => {
  return (
    <rect
      as='rect'
      {...d}
      onMouseEnter={() => setHovered(d.name)}
      onMouseOut={() => setHovered("")}
      // opacity={hovered && hovered !== d.name ? "0.4" : "1"}
      // stroke={hovered === d.name ? "black" : ""}
      // transition='all ease-out 700ms 100ms'
      // transitionProperty='opacity, stroke'
      style={{
        opacity: hovered && hovered !== d.name ? "0.4" : "1",
        stroke: hovered === d.name ? "black" : "",
        transition: "all ease-out 700ms 100ms",
        transitionProperty: "opacity, stroke",
      }}
    >
      <title>{`${capitalizeFirstChar(d.name)}: ${format(",")(d.value)}`}</title>
    </rect>
  )
}
