import { useBreakpointValue } from "@chakra-ui/react"
import { monthsMap } from "../../../utility/maps"

export const BottomAxis = ({
  xScale,
  height,
  yOffset,
  showBy,
  // fontSize,
  selected,
}: any) => {
  const fontSize = useBreakpointValue({ base: "0.7rem", sm: "1rem" })
  if (!xScale) return null
  return xScale.domain().map((tick: string) => (
    <text
      key={tick}
      x={xScale(tick) + xScale.bandwidth() / 2}
      y={height + yOffset}
      textAnchor='middle'
      fontSize={fontSize}
      transform={
        showBy === "category"
          ? `rotate(-15 ${xScale(tick) + xScale.bandwidth() / 2} ${
              height + yOffset
            })`
          : undefined
      }
      fontWeight={tick === selected ? "bold" : ""}
    >
      {showBy === "month" ? monthsMap.get(tick) : tick}
    </text>
  ))
}
