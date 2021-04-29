import { useState, useEffect } from "react"

import { didFetchYear } from "../../utility/utility"
import { getChartDataAndScales } from './getChartDataAndScales'

export const useChartData = ({
  turnLoadingOff,
  data,
  year,
  width,
  height,
  margin,
  withPayers,
  withStacks,
  withCategories,
}) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const [chartData, setChartData] = useState([])
  const [chartScales, setChartScales] = useState({})

  useEffect(() => {
    // console.log(withPayers, withStacks, withCategories)
    // console.log(`${+withPayers}${+withStacks}${+withCategories}`)
    if (didFetchYear(data, year)) {
      const { chartData, chartScales } = getChartDataAndScales(
        data,
        year,
        { innerWidth, innerHeight },
        { withPayers, withStacks, withCategories }
      )
      setChartData(chartData)
      setChartScales(chartScales)
      turnLoadingOff()
    }
  }, [data, year, withPayers, withStacks, withCategories])

  useEffect(() => {
    // console.log("chartData", chartData)
    // console.log("chartScales", chartScales)
  }, [chartData])

  return {
    chartData,
    chartScales,
    innerHeight,
    innerWidth,
  }
}
