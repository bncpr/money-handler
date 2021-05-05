import { useEffect, useState } from "react"
import { getChartData } from "./maps/maps"
import * as R from "ramda"
import { didFetchYear } from "../../utility/utility"

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
  withPayers,
  withStacks,
  withCategories,
  colors,
  isLoading,
  turnLoadingOff,
}) => {
  const [state, setState] = useState([])

  useEffect(() => {
    if (didFetchYear(data, year)) {
      const entries = getEntries(data, year)
      const options = { withPayers, withStacks, withCategories }
      const { chartData, xScale, yScale, rects } = getChartData(
        options,
        entries,
        innerWidth,
        innerHeight,
        colors
      )

      // console.log(chartData, xScale.domain(), yScale.domain(), rects)
      setState({ rects, yScale, xScale, chartData })
      if (isLoading && rects) {
        turnLoadingOff()
      }
    }
  }, [
    data,
    year,
    withPayers,
    withStacks,
    withCategories,
    colors,
    innerHeight,
    innerWidth,
  ])

  const { rects, yScale, xScale } = state

  return { rects, yScale, xScale }
}
