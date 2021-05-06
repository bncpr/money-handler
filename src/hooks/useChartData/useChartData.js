import { useEffect, useState } from "react"
import * as R from "ramda"
import { didFetchYear } from "../../utility/utility"
import { getChartData } from "./getChartData"

const getEntries = (data, year) =>
  R.pipe(
    R.prop(year),
    R.prop("months"),
    R.values,
    R.chain(R.pipe(R.prop("entries"), R.values))
  )(data)

export const useChartData = ({
  data,
  year,
  innerWidth,
  innerHeight,
  isLoading,
  turnLoadingOff,
  showBy,
  series,
  chartType,
}) => {
  const [state, setState] = useState({})

  useEffect(() => {
    if (didFetchYear(data, year)) {
      const entries = getEntries(data, year)

      const {
        chartData,
        chartScales: { xScale, yScale },
      } = getChartData(
        chartType,
        showBy,
        series,
        entries,
        innerWidth,
        innerHeight
      )

      setState({ chartData, xScale, yScale })
      if (isLoading && chartData) {
        turnLoadingOff()
      }
    }
  }, [
    data,
    year,
    innerHeight,
    innerWidth,
    series,
    showBy,
    chartType,
    isLoading,
    turnLoadingOff,
  ])
  const { chartData, xScale, yScale } = state
  return { chartData, xScale, yScale }
}
