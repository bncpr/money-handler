import { monthsMap } from "../../../utility/maps"

export const BottomAxis = ({ xScale, height, yOffset, showBy }) => {
  if (!xScale) return null
  return xScale.domain().map(tick => (
    <text
      key={tick}
      x={xScale(tick) + xScale.bandwidth() / 2}
      y={height + yOffset}
      textAnchor='middle'
      transform={
        showBy === "category"
          ? `rotate(-10 ${xScale(tick) + xScale.bandwidth() / 2} ${
              height + yOffset
            })`
          : "none"
      }
    >
      {showBy === "month" ? monthsMap.get(tick) : tick}
    </text>
  ))
}
