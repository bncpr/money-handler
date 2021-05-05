import { easeElastic, format, select } from "d3"
import { useCallback, useEffect } from "react"
import { useChartData } from "../../../hooks/useChartData/useChartData"
import { Chart } from "../Chart"
import { BottomAxis } from "./BottomAxis"
import { LeftAxis } from "./LeftAxis"

export const BarChart = ({
  data,
  year,
  options: { withPayers, withCategories, withStacks },
  colors,
  isLoading,
  turnLoadingOff,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const { xScale, yScale, rects } = useChartData({
    data,
    year,
    innerWidth,
    innerHeight,
    withPayers,
    withStacks,
    withCategories,
    colors,
    isLoading,
    turnLoadingOff,
  })

  useEffect(() => {
    if (!isLoading && rects && rects.length !== 0) {
      const refs = rects.map(r => r.props.ref)
      refs.forEach((d, i) => {
        select(d.current)
          .transition()
          .ease(easeElastic.period(0.9))
          .duration(900)
          .attr("y", rects[i].props.y)
          .attr("height", rects[i].props.height)
      })
    }
  }, [rects, isLoading])

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
      />
      <LeftAxis yScale={yScale} width={innerWidth} />
      {!isLoading && rects
        ? rects.map(rect => {
            const props = { ...rect.props, y: yScale(0), height: 0 }
            return (
              <rect {...props}>
                <title>{rect.tooltip}</title>
              </rect>
            )
          })
        : null}
    </Chart>
  )
}
