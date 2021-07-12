import { capitalizeFirstChar } from "../../../../../utility/utility"
import { format } from "d3-format"

export function BarLabel(props: any) {
  return (
    <text
      transform={`translate(${props.d.x + props.d.width},${props.d.y})`}
      fontSize={props.fontSize}
      dy='0.5em'
      dx='0.2em'
    >
      <tspan fontWeight='bold' y='-0.5em'>
        {capitalizeFirstChar(props.d.name)}
      </tspan>
      <tspan x='0.2em' y='1.1em'>
        {format(",")(props.d.value)}
      </tspan>
    </text>
  )
}
