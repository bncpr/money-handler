import { useChartData } from "../../../hooks/useChartData/useChartData"
import { selectColorsSet } from "../../../hooks/useColors/useColors"
import { BottomAxis } from "./BottomAxis"
import { LeftAxis } from "./LeftAxis"
import { Unit } from "./Unit/Unit"
import { useFocus } from "../../../hooks/useFocus/useFocus"
import { Box, Heading } from "@chakra-ui/layout"
import { useEffect } from "react"

const isDoneLoading = (isLoading, chartData) => !isLoading && chartData

export const BarChart = ({
  data,
  year,
  isLoading,
  turnLoadingOff,
  showBy,
  series,
  chartType,
  colors,
  ...rest
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

  const colorsSet = selectColorsSet(series, showBy, colors)
  const { focusedUnit, onMouseEnter, onMouseOut } = useFocus()

  return (
    <Box
      as='svg'
      h={height}
      w={width}
      shadow='2xl'
      borderRadius='xl'
      bgColor='gray.50'
      m='auto'
      {...rest}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
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
              colors={colorsSet}
              onMouseEnter={onMouseEnter(unit.unit)}
              onMouseOut={onMouseOut()}
              focused={focusedUnit}
            />
          ))}
      </g>
    </Box>
  )
}
