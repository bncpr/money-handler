import * as R from "ramda"

import { monthlySumsPipe, seriesPipe, stackPipe } from "./dataPipes"

import {
  barChartScales,
  barChartSeriesScales,
  barChartStackScales,
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

const barChartMap = new Map([
  ["000", monthlySumsBars],
  ["001", seriesSumsBars("category")],
  ["100", seriesSumsBars("payer")],
  ["011", stackedSumsBars("category")], // stacked categories
  ["110", stackedSumsBars("payer")], // stacked payers
  ["101", null],
  ["111", null],
  ["010", null], // nothing to stack
])

const getChartType = ({ withPayers, withStacks, withCategories }) =>
  `${+withPayers}${+withStacks}${+withCategories}`

export const getChartDataAndScales = (data, year, dimensions, options) => {
  return barChartMap.get(getChartType(options))(data, year, dimensions)
}
