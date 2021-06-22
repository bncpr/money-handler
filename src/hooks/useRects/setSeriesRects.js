import * as R from "ramda"
import { format } from "d3"
import { createRef } from "react"

import { getSubScale } from "../useChartData/utility/utilityFns"

export const setSeriesRects = (
  unit,
  xScale,
  yScale,
  height,
  colors,
  setRects
) => {
  const { series, unit: name } = unit
  const subScale = getSubScale(
    getSeriesKeysDescending(series),
    xScale(name),
    xScale.bandwidth()
  )

  setRects(
    R.mapObjIndexed(
      (val, key) => ({
        props: {
          key: name + key,
          x: subScale(key),
          y: yScale(val),
          width: subScale.bandwidth(),
          height: height - yScale(val),
          fill: colors[key],
          ref: createRef(),
        },
        tooltip: `${key}: ${format(",d")(val)}`,
      }),
      series
    )
  )
}

const getSeriesKeysDescending = R.pipe(
  R.toPairs,
  R.sort(R.descend(R.prop(1))),
  R.map(R.prop(0))
)
