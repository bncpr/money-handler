import { format } from "d3"

import { Chart } from "../Chart"
import { LeftAxis } from "./LeftAxis"
import { BottomAxis } from "./BottomAxis"
import { Marks } from "./Marks"
import { SubMarks } from "./SubMarks"

import { useChartData } from "../../../hooks/useChartData"

export const BarChart = ({
  data,
  year,
  chartType,
  withPayers,
  payerColors,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 40 }

  const { chartData, innerHeight, innerWidth, yScale, xScale } = useChartData({
    data,
    year,
    width,
    height,
    margin,
    chartType,
  })

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      <LeftAxis yScale={yScale} width={innerWidth} tickFormat={format("~s")} />
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
      />
      {withPayers ? (
        <SubMarks
          data={chartData}
          height={innerHeight}
          yScale={yScale}
          xScale={xScale}
          tooltipFormat={format(",d")}
          xAccessor={d => d.month}
          yAccessor={(d, payer) => d.payersSums[payer]}
          colors={payerColors}
        />
      ) : (
        <Marks
          data={chartData}
          height={innerHeight}
          yScale={yScale}
          xScale={xScale}
          tooltipFormat={format(",d")}
          xAccessor={d => d.month}
          yAccessor={d => d.sum}
        />
      )}
    </Chart>
  )
}
