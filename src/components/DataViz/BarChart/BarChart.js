import { useEffect, useMemo, useState } from "react"
import { useChartData } from "../../../hooks/useChartData/useChartData"
import { Chart } from "../Chart"

export const BarChart = ({
  data,
  year,
  options: { withPayers, withCategories, withStacks },
  colors,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const rects = useChartData({
    data,
    year,
    innerWidth,
    innerHeight,
    withPayers,
    withStacks,
    withCategories,
    colors,
  })

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      {rects
        ? rects.map(rect => (
            <rect {...rect.props}>
              <title>{rect.tooltip}</title>
            </rect>
          ))
        : null}
    </Chart>
  )
}
