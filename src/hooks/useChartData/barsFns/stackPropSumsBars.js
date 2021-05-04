import { getCategories } from "../utility/getUniqueProps"
import { stackPayerRects, stackCategoryRects } from "../rectsFns/stackRects"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import {
  maxSumMonth,
  chooseCategoryColors,
  choosePayerColors,
} from "../utility/utilityFns"
import { getPayers } from "../utility/getUniqueProps"
import * as R from "ramda"
import { stackCategoryRectsNew, stackPayerRectsNew } from "../rectsFns/stackRectsNew"

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
  stackPayerRectsNew,
  getPayers,
  choosePayerColors
)
export const stackCategorySumsBars = stackPropSumsBars(
  maxSumMonth,
  stackCategoryRectsNew,
  getCategories,
  chooseCategoryColors
)
