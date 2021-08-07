import { useBreakpointValue } from "@chakra-ui/react"
import { format } from "d3-format"
import * as styled from "./_modules/styles"

export const LeftAxis = ({ yScale, width }: any) => {
  const fontSize = useBreakpointValue({ base: "0.7rem", sm: "1rem" })
  if (!yScale) return null
  return yScale.ticks().map((tick: number) => (
    <g key={tick} transform={`translate(0,${yScale(tick)})`}>
      <styled.TickLine x2={width} />
      <text x={-4} dy='0.30em' textAnchor='end' fontSize={fontSize}>
        {format("~s")(tick)}
      </text>
    </g>
  ))
}
