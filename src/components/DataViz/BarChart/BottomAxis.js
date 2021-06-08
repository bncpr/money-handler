import { monthsMap } from "../../../utility/maps"

export const BottomAxis = ({ xScale, height, yOffset, showBy, fontSize }) => {
  if (!xScale) return null
  return xScale.domain().map(tick => (
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
          : null
      }
    >
      {showBy === "month" ? monthsMap.get(tick) : tick}
    </text>
  ))
}
