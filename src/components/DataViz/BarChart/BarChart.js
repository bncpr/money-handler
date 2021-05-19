import { useChartData } from "../../../hooks/useChartData/useChartData"
import { useColors } from "../../../hooks/useColors/useColors"
import { Chart } from "../Chart"
import { BottomAxis } from "./BottomAxis"
import { LeftAxis } from "./LeftAxis"
import { Unit } from "./Unit/Unit"
import { useFocus } from "../../../hooks/useFocus/useFocus"

const isDoneLoading = (isLoading, chartData) => !isLoading && chartData

export const BarChart = ({
  data,
  year,
  isLoading,
  turnLoadingOff,
  showBy,
  series,
  chartType,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 55, left: 45 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const { chartData, xScale, yScale } = useChartData({
    data,
    year,
    innerWidth,
    innerHeight,
    isLoading,
    turnLoadingOff,
    chartType,
    showBy,
    series,
  })

  const colors = useColors(series, showBy)
  const { focusedUnit, onMouseEnter, onMouseOut } = useFocus()
  
  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}>
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
        showBy={showBy}
      />
      <LeftAxis yScale={yScale} width={innerWidth} />
      {isDoneLoading(isLoading, chartData) &&
        chartData.map(unit => (
          <Unit
            key={unit.unit}
            unit={unit}
            xScale={xScale}
            yScale={yScale}
            height={innerHeight}
            colors={colors}
            onMouseEnter={onMouseEnter(unit.unit)}
            onMouseOut={onMouseOut()}
            focused={focusedUnit}
          />
        ))}
    </Chart>
  )
}
