import { useChartData } from "../../../hooks/useChartData/useChartData"
import { Chart } from "../Chart"
import { BottomAxis } from "./BottomAxis"
import { LeftAxis } from "./LeftAxis"
import { Unit } from "./Unit/Unit"

export const BarChart = ({
  data,
  year,
  colors,
  isLoading,
  turnLoadingOff,
  showBy,
  series,
  chartType,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }
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
      {!isLoading &&
        chartData &&
        chartData.map(unit => (
          <Unit
            key={unit.unit}
            unit={unit}
            xScale={xScale}
            yScale={yScale}
            height={innerHeight}
            colors={selectColorsSet(series, colors)}
          />
        ))}
    </Chart>
  )
}

function selectColorsSet(series, colors) {
  return series
    ? series === "payer"
      ? colors.payerColors
      : series === "category"
      ? colors.categoryColors
      : null
    : null
}
