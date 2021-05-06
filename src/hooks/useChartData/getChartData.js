import { getScales } from "./scalesFns/getScales"
import { parseData } from "./processData/parseData"

export const getChartData = (
  chartType,
  showBy,
  series,
  entries,
  innerWidth,
  innerHeight,
) => {
  const chartData = parseData(showBy, series, entries)
  const chartScales = getScales(
    chartData,
    showBy,
    series,
    innerWidth,
    innerHeight
  )
  // console.log(chartData, chartScales)
  return { chartData, chartScales }
}
