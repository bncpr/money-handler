import { select, selectAll, transition } from "d3"
import { useEffect } from "react"
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

  const { yScale, rects } = useChartData({
    data,
    year,
    innerWidth,
    innerHeight,
    withPayers,
    withStacks,
    withCategories,
    colors,
  })
  // console.log(rects);

  useEffect(() => {
    if (rects && rects.length !== 0) {
      const refs = rects.map(r => r.props.ref)
      refs.forEach((d, i) => {
        select(d.current)
          .transition()
          .duration(1000)
          .attr("y", rects[i].props.y)
          .attr("height", rects[i].props.height)
      })
    }
  }, [rects])

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      {rects
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
