import { singleMonthlyRects } from "../rectsFns/singleMonthlyRects"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import { maxSumMonth } from "../utility/utilityFns"

export const singleMonthlySumsBars = (entries, innerWidth, innerHeight) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxSumMonth(chartData))
  const rects = singleMonthlyRects(chartData, xScale, yScale, innerHeight)
  return { chartData, xScale, yScale, rects }
}
