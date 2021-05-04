import { seriesCategoryRects, seriesPayerRects } from "../rectsFns/seriesRects"
import { seriesCategoryRectsNew, seriesPayerRectsNew } from "../rectsFns/seriesRectsNew"
import { getYScale } from "../scalesFns/scalesFns"
import { processDataAndXScale } from "../utility/processDataAndXScale"
import {
  maxPayerSum,
  chooseCategoryColors,
  choosePayerColors,
  maxCategorySum,
} from "../utility/utilityFns"
import * as R from "ramda"

const seriesPropSumsBars = R.curry(
  (maxFn, rectsFn, colorChooser, entries, innerWidth, innerHeight, colors) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(chartData, xScale, yScale, innerHeight, pickedColors)
    return { chartData, xScale, yScale, rects }
  }
)
export const seriesCategorySumsBars = seriesPropSumsBars(
  maxCategorySum,
  seriesCategoryRectsNew,
  chooseCategoryColors
)
export const seriesPayerSumsBars = seriesPropSumsBars(
  maxPayerSum,
  seriesPayerRects,
  choosePayerColors
)
