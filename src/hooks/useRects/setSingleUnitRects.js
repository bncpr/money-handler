import { format } from "d3"
import { createRef } from "react"

export const setSingleUnitRects = (
  unit,
  xScale,
  yScale,
  height,
  colors,
  setRects
) => {
  const { unit: key, sum } = unit
  const y = yScale(sum)

  setRects({
    [key]: {
      props: {
        key,
        x: xScale(key),
        y,
        width: xScale.bandwidth(),
        height: height - y,
        fill: colors ? colors[key] : "#5C8100",
        ref: createRef(),
      },
      tooltip: `${format(",d")(sum)}`,
    },
  })
}
