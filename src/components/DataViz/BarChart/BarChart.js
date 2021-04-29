import { format } from "d3"

import { Chart } from "../Chart"
import { LeftAxis } from "./LeftAxis"
import { BottomAxis } from "./BottomAxis"
import { Marks } from "./Marks"
import { SubMarks } from "./SubMarks"
import { StackedMarks } from "./StackedMarks"

import { useChartData } from "../../../hooks/useChartData/useChartData"
import { keys, map, objOf, pipe, prop, props } from "ramda"
import {
  average,
  extractAverageSum,
  flattenProp,
} from "../../../utility/utility"
import { AverageTick } from "./AverageTick"
import { useCallback } from "react"

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
    chartScales: { xScale, yScale, subScales, stackedData },
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

  const monthlyAverageSum = extractAverageSum(chartData)

  const stackedPayers = (
    <StackedMarks
      data={chartData.map(m => ({ month: m.month, ...m.payersSums }))}
      stacks={keys(payerColors)}
      colors={payerColors}
      xScale={xScale}
      yScale={yScale}
      tooltipFormat={format(",d")}
    />
  )
  const sumsWithCategories = (
    <StackedMarks
      data={chartData.map(m => ({ month: m.month, ...m.categoriesSums }))}
      stacks={keys(categoryColors)}
      colors={categoryColors}
      xScale={xScale}
      yScale={yScale}
      tooltipFormat={format(",d")}
    />
  )

  let marks = null
  if (!withPayers && !withStacks && !withCategories) {
    marks = (
      <>
        {/* <AverageTick width={innerWidth} average={yScale(monthlyAverageSum)} /> */}
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
        data={chartData}
        stacked={stackedData}
        colors={withPayers ? payerColors : categoryColors}
        xScale={xScale}
        yScale={yScale}
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
