import { getCategories } from "../processData/processData"
import { seriesPayerStackCategoryRects } from "../rectsFns/seriesPayerStackCategoryRects"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import { maxPayerSum } from "../utility/utilityFns"

export const seriesPayerStackCategory = (
  entries,
  innerWidth,
  innerHeight,
  { categoryColors }
) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxPayerSum(chartData))
  const rects = seriesPayerStackCategoryRects(
    chartData,
    xScale,
    yScale,
    getCategories(entries),
    categoryColors
  )
  return { chartData, xScale, yScale, rects }
}
