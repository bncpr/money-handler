import { seriesPayerStackCategory } from "../barsFns/seriesPayerStackCategory"
import {
  stackCategorySumsBars,
  stackPayerSumsBars
} from "../barsFns/stackPropSumsBars"
import {
  seriesCategorySumsBars,
  seriesPayerSumsBars
} from "../barsFns/seriesPropSumsBars"
import { singleMonthlySumsBars } from "../barsFns/singleMonthlySumsBars"

const chartOptionsMap = new Map([
  ["000", singleMonthlySumsBars],
  ["001", seriesCategorySumsBars],
  ["100", seriesPayerSumsBars],
  ["011", stackCategorySumsBars],
  ["110", stackPayerSumsBars],
  ["111", seriesPayerStackCategory],
  ["101", null], // should always be stacked ^
  ["010", null], // nothing to stack
])

const getOptionsType = ({ withPayers, withStacks, withCategories }) => {
  const type = `${+withPayers}${+withStacks}${+withCategories}`
  if (type === "010") return "000"
  return type === "101" ? "111" : type
}

export const getProcessFunction = options =>
  chartOptionsMap.get(getOptionsType(options))
