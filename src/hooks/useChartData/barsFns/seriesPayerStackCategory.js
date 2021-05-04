import { getCategories } from "../utility/getUniqueProps"
import { seriesPayerStackCategoryRects } from "../rectsFns/seriesPayerStackCategoryRects"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import { maxPayerSum } from "../utility/utilityFns"
import { seriesPayerStackCategoryRectsNew } from "../rectsFns/seriesPayerStackCategoryRectsNew"

export const seriesPayerStackCategory = (
  entries,
  innerWidth,
  innerHeight,
  { categoryColors }
) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxPayerSum(chartData))
  const rects = seriesPayerStackCategoryRectsNew(
    chartData,
    xScale,
    yScale,
    getCategories(entries),
    categoryColors
  )
  return { chartData, xScale, yScale, rects }
}
