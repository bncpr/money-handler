import { format } from "d3"

import { Chart } from "../Chart"
import { LeftAxis } from "./LeftAxis"
import { BottomAxis } from "./BottomAxis"
import { Marks } from "./Marks"
import { SubMarks } from "./SubMarks"
import { StackedMarks } from "./StackedMarks"

import { useChartData } from "../../../hooks/useChartData/useChartData"

import { StackedSeriesMarks } from "./StackedSeriesMarks"
import * as R from "ramda"

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

  // const {
  //   marks,
  //   chartData,
  //   innerHeight,
  //   innerWidth,
  //   chartScales: { xScale, yScale, subScales, stackedData, stackedSeriesData },
  // } = useChartData({
  //   turnLoadingOn,
  //   turnLoadingOff,
  //   isLoading,
  //   data,
  //   year,
  //   width,
  //   height,
  //   margin,
  //   withPayers,
  //   withCategories,
  //   withStacks,
  // })

  const filters = ["month"]
  const _data = R.pipe(
    R.prop(year),
    R.prop("months"),
    R.values,
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten
  )(data)

  const getMonths = data =>
    R.pipe(
      R.map(R.prop("month")),
      R.uniq,
      R.sortBy(R.identity),
      R.map(R.objOf("month"))
    )(data)

  console.log(getMonths(_data))
  // let marks = null
  // if (!withPayers && !withStacks && !withCategories) {
  //   marks = (
  //     <>
  //       <Marks
  //         data={chartData}
  //         height={innerHeight}
  //         yScale={yScale}
  //         xScale={xScale}
  //         tooltipFormat={format(",d")}
  //         xAccessor={d => d.month}
  //         yAccessor={d => d.sum}
  //       />
  //     </>
  //   )
  // } else if (
  //   !withStacks &&
  //   (withCategories || withPayers) &&
  //   withCategories !== withPayers // XOR
  // ) {
  //   marks = (
  //     <SubMarks
  //       data={chartData}
  //       height={innerHeight}
  //       yScale={yScale}
  //       subScales={subScales}
  //       tooltipFormat={format(",d")}
  //       xAccessor={d => d.month}
  //       colors={withPayers ? payerColors : categoryColors}
  //     />
  //   )
  // } else if (
  //   withStacks &&
  //   (withCategories || withPayers) &&
  //   withCategories !== withPayers
  // ) {
  //   marks = (
  //     <StackedMarks
  //       stacked={stackedData}
  //       colors={withPayers ? payerColors : categoryColors}
  //       xScale={xScale}
  //       yScale={yScale}
  //       tooltipFormat={format(",d")}
  //     />
  //   )
  // } else if (withPayers && withCategories) {
  //   marks = (
  //     <StackedSeriesMarks
  //       data={chartData}
  //       stackedSeries={stackedSeriesData}
  //       subScales={subScales}
  //       xScale={xScale}
  //       yScale={yScale}
  //       colors={categoryColors}
  //       tooltipFormat={format(",d")}
  //     />
  //   )
  // }
  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      {/* <LeftAxis yScale={yScale} width={innerWidth} tickFormat={format("~s")} />
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
      />
      {marks.map(rect => (
        <rect {...rect.props}>
          <title>{rect.tooltip}</title>
        </rect>
      ))} */}
    </Chart>
  )
}
