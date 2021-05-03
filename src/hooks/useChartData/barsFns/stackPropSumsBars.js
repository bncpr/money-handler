import { getCategories } from "../processData/processData"
import { stackPayerRects, stackCategoryRects } from "../rectsFns/stackRects"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import {
  maxSumMonth,
  chooseCategoryColors,
  choosePayerColors,
} from "../utility/utilityFns"
import { getPayers } from "../processData/processData"
import * as R from "ramda"

const stackPropSumsBars = R.curry(
  (
    maxFn,
    rectsFn,
    keysFn,
    colorChooser,
    entries,
    innerWidth,
    innerHeight,
    colors
  ) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(
      keysFn(entries),
      chartData,
      xScale,
      yScale,
      pickedColors
    )
    return { chartData, xScale, yScale, rects }
  }
)
export const stackPayerSumsBars = stackPropSumsBars(
  maxSumMonth,
  stackPayerRects,
  getPayers,
  choosePayerColors
)
export const stackCategorySumsBars = stackPropSumsBars(
  maxSumMonth,
  stackCategoryRects,
  getCategories,
  chooseCategoryColors
)
