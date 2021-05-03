import { processData } from "../processData/processData"
import { getXScaleForMonths } from "../scalesFns/scalesFns"

export const processDataAndXScale = (entries, innerWidth) => {
  const chartData = processData(entries)
  const xScale = getXScaleForMonths(chartData, innerWidth)
  return { chartData, xScale }
}
