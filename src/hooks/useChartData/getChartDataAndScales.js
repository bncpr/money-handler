import * as R from "ramda"

import {
  monthlySumsPipe,
  seriesPipe,
  stackPipe,
  stackedSeriesPipe,
} from "./dataPipes"

import {
  barChartScales,
  barChartSeriesScales,
  barChartStackScales,
  barChartStackSeriesScales,
} from "./scales"

const monthlySumsBars = R.curry((data, year, { innerWidth, innerHeight }) => {
  const chartData = monthlySumsPipe(data, year)
  const chartScales = barChartScales(chartData, innerWidth, innerHeight)
  return { chartData, chartScales }
})

const seriesSumsBars = R.curry(
  (propName, data, year, { innerWidth, innerHeight }) => {
    const chartData = seriesPipe(propName, data, year)
    const chartScales = barChartSeriesScales(chartData, innerWidth, innerHeight)
    return { chartData, chartScales }
  }
)
const stackedSumsBars = R.curry(
  (propName, data, year, { innerWidth, innerHeight }) => {
    const chartData = stackPipe(propName, data, year)
    const chartScales = barChartStackScales(chartData, innerWidth, innerHeight)
    return { chartData, chartScales }
  }
)
const stackedSeriesSumsBars = R.curry(
  (propName1, propName2, data, year, { innerWidth, innerHeight }) => {
    const chartData = stackedSeriesPipe(propName1, propName2, data, year)
    const chartScales = barChartStackSeriesScales(
      chartData,
      innerWidth,
      innerHeight
    )
    return { chartData, chartScales }
  }
)
const barChartMap = new Map([
  ["000", monthlySumsBars],
  ["001", seriesSumsBars("category")],
  ["100", seriesSumsBars("payer")],
  ["011", stackedSumsBars("category")],
  ["110", stackedSumsBars("payer")],
  ["111", stackedSeriesSumsBars("payer", "category")],
  ["101", null], // should always be stacked ^
  ["010", null], // nothing to stack
])

const getChartType = ({
  withPayers,
  withStacks,
  withCategories,
  seriesStackOrder,
}) => {
  const type = `${+withPayers}${+withStacks}${+withCategories}`
  if (type === "010") return "000"
  return type === "101" ? "111" : type
}

export const getChartDataAndScales = (data, year, dimensions, options) => {
  return barChartMap.get(getChartType(options))(data, year, dimensions)
}
