import { useEffect, useState } from "react"
import { getProcessFunction } from "./barsFns/barsFns"
import * as R from "ramda"

const getEntries = (data, year) =>
  R.pipe(
    R.prop(year),
    R.prop("months"),
    R.values,
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten
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
}) => {
  const [rects, setRects] = useState([])

  useEffect(() => {
    const entries = getEntries(data, year)
    const options = { withPayers, withStacks, withCategories }
    const { chartData, xScale, yScale, rects } = getProcessFunction(options)(
      entries,
      innerWidth,
      innerHeight,
      colors
    )

    console.log(chartData, xScale.domain(), yScale.domain(), rects)
    setRects(rects)
  }, [data, year, withPayers, withStacks, withCategories, colors])

  return rects
}
