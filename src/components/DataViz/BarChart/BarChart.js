import { format } from "d3"

import { Chart } from "../Chart"
import { LeftAxis } from "./LeftAxis"
import { BottomAxis } from "./BottomAxis"
import { Marks } from "./Marks"
import { SubMarks } from "./SubMarks"
import { StackedMarks } from "./StackedMarks"

import { useChartData } from "../../../hooks/useChartData"
import { keys, map, objOf, pipe, prop, props } from "ramda"
import {
  average,
  extractAverageSum,
  flattenProp,
} from "../../../utility/utility"
import { AverageTick } from "./AverageTick"

export const BarChart = ({
  data,
  year,
  chartType,
  withPayers,
  payerColors,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }

  const { chartData, innerHeight, innerWidth, yScale, xScale } = useChartData({
    data,
    year,
    width,
    height,
    margin,
    chartType,
    withPayers,
  })

  const monthlyAverageSum = extractAverageSum(chartData)

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
        <StackedMarks
          data={chartData.map(m => ({ month: m.month, ...m.payersSums }))}
          payers={keys(payerColors)}
          colors={payerColors}
          xScale={xScale}
          yScale={yScale}
        />
      ) : (
        // <SubMarks
        //   data={chartData}
        //   height={innerHeight}
        //   yScale={yScale}
        //   xScale={xScale}
        //   tooltipFormat={format(",d")}
        //   xAccessor={d => d.month}
        //   yAccessor={(d, payer) => d.payersSums[payer]}
        //   colors={payerColors}
        // />
        <>
          <AverageTick width={innerWidth} average={yScale(monthlyAverageSum)} />
          <Marks
            data={chartData}
            height={innerHeight}
            yScale={yScale}
            xScale={xScale}
            tooltipFormat={format(",d")}
            xAccessor={d => d.month}
            yAccessor={d => d.sum}
          />
        </>
      )}
    </Chart>
  )
}
