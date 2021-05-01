import { format } from "d3-format"
import { useState, useEffect, createRef } from "react"

import { didFetchYear } from "../../utility/utility"
import { getChartDataAndScales } from "./getChartDataAndScales"
import { singleSumsMarks, stackedMarks } from "./makeMarks"

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
  const [marks, setMarks] = useState([])

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

      let marks = []
      const { xScale, yScale, subScales, stackedData } = chartScales
      if (!withPayers && !withCategories) {
        marks = singleSumsMarks(chartData, year, innerHeight, xScale, yScale)
      } else if (withPayers || withCategories) {
        if (withPayers !== withCategories) {
          if (withStacks) {
            console.log(stackedData)
            marks = stackedMarks(stackedData, year, xScale, yScale)
          }
        }
      }
      console.log("MARKS", marks)
      setMarks(marks)
      turnLoadingOff()
    }
  }, [
    data,
    year,
    innerWidth,
    innerHeight,
    withPayers,
    withStacks,
    withCategories,
  ])

  useEffect(() => {
    console.log("chartData", chartData)
    console.log("chartScales", chartScales)
  }, [chartData])

  return {
    chartData,
    chartScales,
    innerHeight,
    innerWidth,
    marks,
  }
}
