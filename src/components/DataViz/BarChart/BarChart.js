import { useState, useEffect } from "react"
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

  const [hoveredUnit, setHoveredUnit] = useState()
  const [focusedUnit, setFocusedUnit] = useState()

  useEffect(() => {
    const t = setTimeout(() => {
      if (hoveredUnit) {
        if (hoveredUnit !== focusedUnit) {
          setFocusedUnit(hoveredUnit)
          // console.log("SET_FOCUS", hoveredUnit)
        }
      } else {
        setFocusedUnit()
        // console.log("UNSET_FOCUS")
      }
    }, 0)
    return () => clearTimeout(t)
  }, [hoveredUnit])

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
        showBy={showBy}
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
            colors={selectColorsSet(series, showBy, colors)}
            onMouseEnter={() => {
              setHoveredUnit(unit.unit)
            }}
            onMouseOut={() => {
              setHoveredUnit()
            }}
            focused={focusedUnit}
          />
        ))}
    </Chart>
  )
}

function selectColorsSet(series, showBy, colors) {
  if (showBy === "payer" || series === "payer") return colors.payerColors
  if (showBy === "category" || series === "category")
    return colors.categoryColors
}
