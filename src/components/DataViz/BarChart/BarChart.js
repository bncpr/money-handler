import { format } from "d3"

import { Chart } from "../Chart"
import { LeftAxis } from "./LeftAxis"
import { BottomAxis } from "./BottomAxis"
import { Marks } from "./Marks"
import { SubMarks } from "./SubMarks"
import { StackedMarks } from "./StackedMarks"

import { useChartData } from "../../../hooks/useChartData/useChartData"

import { StackedSeriesMarks } from "./StackedSeriesMarks"

export const BarChart = ({
  turnLoadingOn,
  turnLoadingOff,
  isLoading,
  data,
  year,
  chartType,
  withPayers,
  payerColors,
  categoryColors,
  withStacks,
  withCategories,
}) => {
  const [width, height] = [960, 500]
  const margin = { top: 40, right: 20, bottom: 40, left: 45 }

  const {
    chartData,
    innerHeight,
    innerWidth,
    chartScales: { xScale, yScale, subScales, stackedData, stackedSeriesData },
  } = useChartData({
    turnLoadingOn,
    turnLoadingOff,
    isLoading,
    data,
    year,
    width,
    height,
    margin,
    chartType,
    withPayers,
    withCategories,
    withStacks,
  })


  let marks = null
  if (!withPayers && !withStacks && !withCategories) {
    marks = (
      <>
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
    )
  } else if (
    !withStacks &&
    (withCategories || withPayers) &&
    withCategories !== withPayers // XOR
  ) {
    marks = (
      <SubMarks
        data={chartData}
        height={innerHeight}
        yScale={yScale}
        subScales={subScales}
        tooltipFormat={format(",d")}
        xAccessor={d => d.month}
        colors={withPayers ? payerColors : categoryColors}
      />
    )
  } else if (
    withStacks &&
    (withCategories || withPayers) &&
    withCategories !== withPayers
  ) {
    marks = (
      <StackedMarks
        stacked={stackedData}
        colors={withPayers ? payerColors : categoryColors}
        xScale={xScale}
        yScale={yScale}
        tooltipFormat={format(",d")}
      />
    )
  } else if (withPayers && withCategories) {
    marks = (
      <StackedSeriesMarks
        data={chartData}
        stackedSeries={stackedSeriesData}
        subScales={subScales}
        xScale={xScale}
        yScale={yScale}
        colors={categoryColors}
        tooltipFormat={format(",d")}
      />
    )
  }
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
      {!isLoading && marks}
    </Chart>
  )
}
