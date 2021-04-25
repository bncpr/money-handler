import { useState, useEffect } from "react"
import { assoc, curry, map, pipe, prop, sortBy } from "ramda"
import { scaleBand, scaleLinear, max } from "d3"

import {
  extractMonthsOfYear,
  addSum,
  addPayers,
  addPayersSums,
} from "../utility/utility"

const barChartPipe = curry((data, year) =>
  pipe(
    extractMonthsOfYear(year),
    sortBy(prop("month")),
    map(pipe(addSum, addPayers, addPayersSums))
  )(data)
)

const chartPipesMap = {
  barChart: barChartPipe,
}
const extractData = curry((chartType, data, year, setState) => {
  setState(chartPipesMap[chartType](data, year))
})

const barChartScales = curry((data, width, height) => {
  return {
    xScale: scaleBand()
      .domain(data.map(prop("month")))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.05),
    yScale: scaleLinear()
      .domain([0, max(data, prop("sum"))])
      .range([height, 0]),
  }
})

export const useChartData = ({
  data,
  year,
  width,
  height,
  margin,
  chartType,
  withPayers,
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (data && year && data[year] instanceof Object) {
      extractData(chartType, data, year, setChartData)

    }
  }, [data, year, chartType, withPayers])

  useEffect(() => {
    console.log(chartData)
  }, [chartData])

  const { xScale, yScale } = barChartScales(chartData, innerWidth, innerHeight)

  return { chartData, xScale, yScale, innerHeight, innerWidth }
}
